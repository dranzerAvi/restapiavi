const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

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
router.get('/createdatabase', (req, res) => {
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
      title: req.body.title,
      description: req.body.description
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

//to find a single document from the collection using a singlefield (title)
router.post('/findadocu', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("allposts");

    nodtst.collection("posts").findOne({
      title: req.body.title
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is find now....." + result.title + ", " + result.description);
      res.send(result);
      databases.close();
    })
  })
});

//to find multiple documents of a particular title
router.post('/findmultiple', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("allposts");
    nodtst.collection("posts").find({
      title: req.body.title
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.title + ", " + post.description);
      }
      res.send(totalposts);
    });
  });
});
//to list all documents
router.get('/listall', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("allposts");
    nodtst.collection("posts").find({}).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.title + ", " + post.description);
      }
      res.send(totalposts);

      //console.log(result);
      databases.close();
    });
  });
});

//To update a document
router.post('/updateone', (req, res) => {
  mongoClient.connect(url, function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("allposts");
    var whereClause = {
      title: req.body.title
    };
    var newvalues = {
      $set: {
        title: req.body.newTitle
      }
    };
    nodtst.collection("posts").updateOne(whereClause, newvalues, function(err, res) {
      if (error) {
        throw error;

      }
      console.log(res.result.n + 1 + "document updated");
      res.send("Document updated");
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
      description: req.body.searchDescription
    };
    var newvalues = {
      $set: {
        title: req.body.newTitle
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