const express = require('express');
const usercontact = require('../schmeaModels/contactSchema');
const router = express.Router();
const multer = require('multer');
const csvtojson = require('csvtojson');

router.get("/mycontacts", async (req, res) => {
    try {
      const mycontacts = await usercontact.find({ user: req.user._id }).populate(
        "user",
        "password"
      );
      console.log(mycontacts);
      return res.status(200).json({
        contacts: mycontacts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  
  }
  );


const FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      const fileArr = file.originalname.split(".");
      cb(null, file.fieldname + Date.now() + "." + fileArr[fileArr.length - 1]);
    },
  });
  
  const upload = multer({ storage: FileStorage });
  
  router.post("/contactpost", upload.single("file"), async (req, res) => {
    // console.log(req.file);
    const file = req.file;
    await csvtojson()
      .fromFile(`./public/uploads/${file.filename}`)
      .then((csvdata) => {
        // console.log(csvdata);
        lengthCsv = csvdata.length;
        for (let i = 0; i < lengthCsv; i++) {
          const newContact = new usercontact({
            name: csvdata[i].name,
            designation: csvdata[i].designation,
            company: csvdata[i].company,
            industry: csvdata[i].industry,
            email: csvdata[i].email,
            phonenumber: csvdata[i].phonenumber,
            country: csvdata[i].country,
            user: req.user._id,
          });
          newContact.save();
        }
      });
      if (req.file) {
        res.json({
          message: "file uploaded",
        });
      }
      else{
        res.json({
          message: "file not uploaded",
        });
      }
  });

router.post("/create", async (req, res) => {
    try {
        const contactslist= await usercontact.create({
            name: req.body.name,
            designation: req.body.designation,
            company: req.body.company,
            industry:req.body.industry,
            email: req.body.email,
            phonenumber:req.body.phonenumber,
            country: req.body.country,
            user: req.user
        });
        // console.log(req.body.contacts);
        res.status(200).json({
            status: "ok",
            contacts:contactslist 
        })
    } catch (e) {
        res.status(400).json({
            status: "Bad request",
            message: e.message
        })
    }
})

router.put("/update", async (req, res) => {
    try {
        const contactslist= await usercontact.findOneAndUpdate({user:req.user},req.body);
        // console.log(req.body.contacts);
        res.status(200).send('contact updated')
    } catch (e) {
        res.status(400).json({
            status: "Bad request",
            message: e.message
        })
    }
})

router.delete("/delete", async (req, res) => {
    console.log("Inside delete");
    console.log(req.body);
    
    try {
        const cont = await usercontact.findById(req.body._id);
        await usercontact.findByIdAndDelete(req.body._id);
        res.json({
          status: "sucess",
          data: req.body,
        });
    } catch (e) {
      res.status(403).json({
        status: "failed",
        message: e.message,
      });
    }
  });

  router.delete("/deleteall", async(request, response) => {
    try{
      for (let contactToDelete of request.body.contactsToDelete) 
        await usercontact.findByIdAndDelete(contactToDelete._id);      
      
      return response.json({
        status: "sucess",
      });
    }
    catch(e) {
      return response.status(500).json({
        status: "failed",
        message: e.message
      });
    }
  });


module.exports = router


