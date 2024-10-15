const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

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


// delete product
router.delete("/delete/:productId", async (req, res) => {
    const productId = req.params.productId;
    try{
        await db.collection("products").doc(`/${productId}/`).delete().then((result) => {
            return res.status(200).send({ success : true, data : result});
        })
    } catch (err) {
        return res.send({ success : false, msg : `Error : ${err}` });
    }
})
  

module.exports = router;