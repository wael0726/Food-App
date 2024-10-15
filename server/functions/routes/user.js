const router = require("express").Router();
const admin = require("firebase-admin")
let data = [];


router.get("/", (req, res) => {
  return res.send("inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
    if(!req.headers.authorization) {
        return res.status(500).send({ msg : "Token Not Found "});
    }

    const token = req.headers.authorization.split(" ")[1]
    try{
        const decodeValue = await admin.auth().verifyIdToken(token)
        if(!decodeValue){
            return res.status(500).json({sucess : false, msg : "Unauthorize access"});
        }
        return res.status(200).json({sucess : true, data : decodeValue});
    } catch(err){
        return res.send({sucess : false, msg : `Error in extracting the token : ${err}`})
    }
});

const listAllUsers = async (nextpagetoken) => {
    admin
      .auth()
      .listUsers(1000, nextpagetoken)
      .then((listuserresult) => {
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listuserresult.pageToken) {
          listAllUsers(listuserresult.pageToken);
        }
      })
      .catch((er) => console.log(er));
  };
  
  listAllUsers();
  
  router.get("/all", async (req, res) => {
    listAllUsers();
    try {
      return res
        .status(200)
        .send({ success: true, data: data, dataCount: data.length });
    } catch (er) {
      return res.send({
        success: false,
        msg: `Error in listing users :,${er}`,
      });
    }
  });


module.exports = router;