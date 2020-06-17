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
router.get('/createDatabase', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) { // use for to connect to the databases
    if (error) {
      throw error;

    }
    var dbobject = databases.db('moverzFax'); //use for create database
    console.log("database is created")
    databases.close();

  });

});

//To create a new collection
<<<<<<< HEAD
router.get('/createCollection', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
=======
router.get('/createcollection', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
    if (error) {
      throw error;

    }
    var dbase = databases.db("moverzFax");
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
router.post('/addSingle', (req, res) => {

  mongoClient.connect(url, { useUnifiedTopology: true },function(err, databases) {
    if (err) {
      throw err;
    }
<<<<<<< HEAD
    var nodetestDB = databases.db("moverzFax"); //here
    var postCollection = nodetestDB.collection("posts");
    var post = {
      custName: req.body.custName,
        custAddress: req.body.custAddress,
        custPhno: req.body.custPhno,
        pickupAddress:req.body.pickupAddress,
        destAddress:req.body.destAddress,
        status:req.body.status
=======
    var nodetestDB = databases.db("allposts"); //here
    var customersCollection = nodetestDB.collection("posts");
    var customer = {
      custName: req.body.custName,
      custAddress: req.body.custAddress,
      custPhno: req.body.custPhno,
      pickupAddress:req.body.pickupAddress,
      destAddress:req.body.destAddress,
      status:req.body.status
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
    };

    postCollection.insertOne(post, function(error, response) {
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
router.post('/addMultiple', (req, res) => {

  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection('posts').insertMany(req.body, function(error, response) {
      if (error) {
        throw error;

      }
      console.log("Numnber of document is inserted.........");
      res.send('Many Document Created');
    })
  })

});

<<<<<<< HEAD
//to find a single document from the collection using a singlefield (title)
router.post('/findByName', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
=======
//to find a single document from the collection using customer name
router.post('/findadocu', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection("posts").findOne({
<<<<<<< HEAD
        custName: req.body.custName
=======
      custName: req.body.custName
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is found....." + result.custName + ", " + result.custPhno);
      res.send(result);
      databases.close();
    })
  })
});

//to find multiple documents of a particular customer
router.post('/findmultiple', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("posts").find({
      custName: req.body.custName
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
<<<<<<< HEAD
        console.log(post.custName + ", " + post.custPhno);
=======
        console.log(post.custName + ", " + post.custPhno+","+post.status);
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
      }
      res.send(totalposts);
    });
  });
});
//to list all documents
<<<<<<< HEAD
router.get('/listAll', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
=======
router.get('/listall', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("posts").find({}).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
<<<<<<< HEAD
        console.log(post.custName + ", " + post.custPhno);
=======
        console.log(post.custName + ", " + post.custPhno+","+post.status);
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
      }
      res.send(totalposts);

      //console.log(result);
      databases.close();
    });
  });
});
//To update a document using address
router.post('/updateUseAddress', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    console.log(req.body.custId);
    var nodtst = databases.db("moverzFax");
    var whereClause = {
      custAddress:req.body.custAddress
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

//To update docimen t using id

<<<<<<< HEAD
=======
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

>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
router.post('/updateOneUseId', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    console.log(req.body.custId);
<<<<<<< HEAD
    var nodtst = databases.db("moverzFax");
=======
    var nodtst = databases.db("allposts");
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
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

  mongoClient.connect(url, { useUnifiedTopology: true },function(err, databases) {
    if (err) {
      throw err;
    }
    var nodeDB = databases.db("moverzFax"); //here
    var myquery = {
<<<<<<< HEAD
    custName: req.body.custName
=======
      custName: req.body.custName
>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
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

<<<<<<< HEAD
=======




>>>>>>> 3b79c7585ec49786b6e81fdf8cafaf93021caf4c
module.exports = router;
