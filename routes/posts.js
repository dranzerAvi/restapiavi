const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

var mongodb = require('mongodb');
var mongoose=require('mongoose')
var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";
// var url="mongodb+srv://dbUser:dbUser@restapiavicluster-7kqdb.mongodb.net/<dbname>?retryWrites=true&w=majority";
//Basic root route
router.get('/', (req, res) => {
  res.send('We are on posts');
});


//To create a new database
router.get('/createdatabase', (req, res) => {
  mongoClient.connect(url, function(error, databases) { // use for to connect to the databases
    if (error) {
      throw error;

    }
    var dbobject = databases.db('allposts'); //use for create database
    console.log("databases is created")
    databases.close();

  });

});

//To create a new collection
router.get('/createcollection', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }
    var dbase = databases.db("allposts");
    dbase.createCollection("posts", function(error, response) {
      if (error) {
        throw error;
      }

      console.log("collection is created.....")
      databases.close();
    });
  });
});

//To create a document
router.post('/add1docu', (req, res) => {

  mongoClient.connect(url, function(err, databases) {
    if (err) {
      throw err;
    }
    var nodetestDB = databases.db("allposts"); //here
    var customersCollection = nodetestDB.collection("posts");
    var customer = {
      custName: req.body.custName,
      custAddress: req.body.custAddress,
      custPhno: req.body.custPhno,
      pickupAddress:req.body.pickupAddress,
      destAddress:req.body.destAddress,
      status:req.body.status
    };

    customersCollection.insertOne(customer, function(error, response) {
      if (error) {
        throw error;
      }

      console.log("1 document inserted");
      res.send('! document inserted');
      databases.close();
    });
  });

});


//To add many docs
router.post('/addmanydocu', (req, res) => {

  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("allposts");

    nodtst.collection('posts').insertMany(req.body, function(error, response) {
      if (error) {
        throw error;

      }
      console.log("Numnber of document is inserted.........");
      res.send('Many Document Created');
    })
  })

});

//to find a single document from the collection using customer name
router.post('/findadocu', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("allposts");

    nodtst.collection("posts").findOne({
      custName: req.body.custName
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is find now....." + result.title + ", " + result.description);
      res.send(result);
      databases.close();
    })
  })
});

//to find multiple documents of a particular customer
router.post('/findmultiple', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("allposts");
    nodtst.collection("posts").find({
      custName: req.body.custName
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.custName + ", " + post.custPhno+","+post.status);
      }
      res.send(totalposts);
    });
  });
});
//to list all documents
router.get('/listall', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("allposts");
    nodtst.collection("posts").find({}).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.custName + ", " + post.custPhno+","+post.status);
      }
      res.send(totalposts);

      //console.log(result);
      databases.close();
    });
  });
});

//To update a document using address
router.post('/updateOneUseAddress', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    console.log(req.body.custId);
    var nodtst = databases.db("allposts");
    var whereClause = {
      custAddress:req.body.custAddress
    };
    var newvalues = {
      $set: {
        status: "Alloted"
      }
    };
    nodtst.collection("posts").updateOne(whereClause, newvalues, function(err, res) {
      if (error) {
        throw error;

      }
      console.log("Document updated");
      databases.close();
    });

  });

});

//To update docimen t using id

router.post('/updateOneUseId', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    console.log(req.body.custId);
    var nodtst = databases.db("allposts");
    var whereClause = {
      _id:mongoose.Types.ObjectId(req.body.custId)
    };
    var newvalues = {
      $set: {
        status: req.body.newCustStatus
      }
    };
    nodtst.collection("posts").updateOne(whereClause, newvalues, function(err, res) {
      if (error) {
        throw error;

      }
      console.log("Document updated");
      databases.close();
    });

  });

});


//To update multiple documents
router.post('/updatemany', (req, res) => {

  mongoClient.connect(url, function(err, databases) {
    if (err) {
      throw err;
    }
    var nodeDB = databases.db("allposts"); //here
    var myquery = {
      custName: req.body.custName
    };
    var newvalues = {
      $set: {
        custAddress: req.body.newCustAddress
      }
    };
    nodeDB.collection("posts").updateMany(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log(res.result.nModified + " document(s) updated");
      res.send('Documents updated');

      databases.close();
    });

  });

});





module.exports = router;
