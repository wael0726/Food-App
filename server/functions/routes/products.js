const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");
db.settings({ignoreUndefinedProperties: true});
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create", async (req, res) => {
    try{
        const id = Date.now();
        const data = {
            productId: id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL, 
          };

          const response = await db.collection("products").doc(`/${id}/`).set(data);
          console.log(res)
          return res.status(200).send({ success : true, data : response});
    } catch {err} {
        return res.send({ success : false, msg : `Error : ${err}` });
    }
});

router.get("/all", async (req, res) => {
        try {
            let query = db.collection("products");
            let response = [];
            await query.get().then((querysnap) => {
                let docs = querysnap.docs;
                docs.map((doc) => {
                    response.push({...doc.data() });
                })
                return response;
            });
            return res.status(200).send({ success : true, data : response});
        } catch (err) {
            return res.send({ success : false, msg : `Error : ${err}` });
        }
    });



router.delete("/delete/:productId", async (req, res) => {
    const productId = req.params.productId;
    try{
        await db.collection("products").doc(`/${productId}/`).delete().then((result) => {
            return res.status(200).send({ success : true, data : result});
        })
    } catch (err) {
        return res.send({ success : false, msg : `Error : ${err}` });
    }
});


router.post("/addToCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
        const doc = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("Items")
        .doc(`/${productId}/`)
        .get();

        if(doc.data()){
            const quantity = doc.data().quantity + 1
            const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("Items")
            .doc(`/${productId}/`)
            .update({quantity});
            return res.status(200).send({ success : true, data : updatedItem});
        } else {
            const data = {
                productId: productId,
                product_name: req.body.product_name,
                product_category: req.body.product_category,
                product_price: req.body.product_price,
                imageURL: req.body.imageURL,
                quantity: 1, 
              };
              const addItem = await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("Items")
              .doc(`/${productId}/`)
              .set(data);
              return res.status(200).send({ success : true, data : addItem});
        }
    } catch (err) {
        return res.send({ success : false, msg : `Error : ${err}` });
    }
});


// get all the cartitems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    (async () => {
      try {
        let query = db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("Items");
        let response = [];
  
        await query.get().then((querysnap) => {
          let docs = querysnap.docs;
  
          docs.map((doc) => {
            response.push({ ...doc.data() });
          });
          return response;
        });
        return res.status(200).send({ success: true, data: response });
      } catch (er) {
        return res.send({ success: false, msg: `Error :,${er}` });
      }
    })();
});


router.post("/updateCart/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    const productId = req.query.productId;
    const type = req.query.type;
  
    try {
      const doc = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("Items")
        .doc(`/${productId}/`)
        .get();
  
      if (doc.data()) {
        if (type === "increment") {
          const quantity = doc.data().quantity + 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("Items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        } else {
          if (doc.data().quantity === 1) {
            await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("Items")
              .doc(`/${productId}/`)
              .delete()
              .then((result) => {
                return res.status(200).send({ success: true, data: result });
              });
          } else {
            const quantity = doc.data().quantity - 1;
            const updatedItem = await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("Items")
              .doc(`/${productId}/`)
              .update({ quantity });
            return res.status(200).send({ success: true, data: updatedItem });
          }
        }
      }
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
});
  

router.post("/create-checkout-session", async (req, res) => {
    try {
      const line_items = req.body.data.cart.map(item => {
        return {
          price_data: {
            currency: "CAD",
            product_data: {
              name: item.product_name,
              images: [item.imageURL],
              metadata: {
                id: item.productId,
              },
            },
            unit_amount: item.product_price * 100, // Convertir en cents
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}`,
      });
  
      res.send({ url: session.url });
    } catch (error) {
      res.status(500).send({ error: error.message }); // Gérer les erreurs ici
    }
});

const endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
      const sig = req.headers["stripe-signature"];
  
      let eventType;
      let data;
  
      if (endpointSecret) {
        let event;
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
      }
  
      // Handle the event
      if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then((customer) => {
          // console.log("Customer details", customer);
          // console.log("Data", data);
          createOrder(customer, data, res);
        });
      }
  
      // Return a 200 res to acknowledge receipt of the event
      res.send().end();
    }
);
  



module.exports = router;