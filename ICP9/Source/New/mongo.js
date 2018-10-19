/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://test123:test123@ds135233.mlab.com:35233/cs5551ase';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/insert', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('demoase').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Adding items Failed, Error While adding");
            res.end();
        }
        console.log("Inserted a document into the asedemo collection.");
        callback();
    });
};

// app.post('/search', function (req, res) {
//     MongoClient.connect(url, function(err, db) {
//         if(err)
//         {
//             res.write("Failed, Error while connecting to Database");
//             res.end();
//         }
//         searchDocument(db, req.body, function() {
//             res.write("Successfully searched");
//             res.end();
//         });
//     });
// });
// var searchDocument = function(db, data) {
//     var cursor = db.collection('demoase').find(data);
//     cursor.each(function(err,doc) {
//         assert.equal(err,null);
//         if(doc != null)
//         {
//             console.log("===========Search Results=========");
//             console.log("First Name: " + doc.fname);
//             console.log("Last Name: " + doc.lname);
//             console.log("Email: " + doc.email);
//             console.log("Course: " + doc.course);
//             return doc;
//         }
//     });
// };

app.post('/search', function (req, res, next) {
    var resultArray = [];
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('demoase').find(req.body);
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc)
        }, function () {
            db.close();
            res.send({items: resultArray});
        });
    });
});

var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});