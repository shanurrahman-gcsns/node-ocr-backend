'use strict';

var express = require('express');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

const findSimilarity = require('./similarityFinder');

var mrz = require('./mrz');

const path = require('path');
// Set up auth

const vision = require("@google-cloud/vision");
const replaceSimilar = require('./replaceSimilar');

var app = express();

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});

// Get the uploaded image
// Image is uploaded to req.file.path
app.post('/upload', upload.single('image'), async function(req, res, next) {
  
    const client = new vision.ImageAnnotatorClient({
      keyFilename: 'secrets.json'
    });
  
    const [result] = await client.textDetection(path.join(__dirname, 'uploads', req.file.filename));
    fs.writeFileSync('output.json', JSON.stringify(result));
  
    if(!result.fullTextAnnotation) {
      return res.status(500).send({error: "No text block found", result});
    }
    const description = result.fullTextAnnotation.text;
    const mrzCode = mrz.extractMrzCode(description);

    try{
      let rst = mrz.runner(mrzCode);
      try{
        const similarDocumentsDict = findSimilarity(rst, result.fullTextAnnotation.text);
        rst = replaceSimilar(rst, similarDocumentsDict);
      }catch(e){
        console.log("similarity error", e.message);
      }
      return res.status(200).send(rst);
    }catch(e){
      console.log(mrzCode, e.message);
      return res.status(500).send({error: e.message, mrzCode});
    }
});

app.listen(1234);
console.log('Server Started');