/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const dayjs = require('dayjs');
const CryptoJs = require('crypto-js');
const querystring = require('querystring');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/inicis', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/inicis/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/inicis', async function(req, res) {
  // Add your code here
  try{
    const dataset = {
      version : '1.0',
      goapymethod : 'VBank',
      mid : 'INIpayTest',
      oid : '11213453252341251',
      timestamp : dayjs().valueOf(),
      price : req.price,
      signature : CryptoJs.SHA256(`oid=`+ dataset.oid + `&price=` + dataset.price + `&timestamp=` + dataset.timestamp).toString(),
      mKey : CryptoJs.SHA256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'),
      currency : 'WON',
      goodname : req.goodname,
      buyername : req.buyername,
      buyertel : req.buyertel,
      buyeremail : req.buyeremail,
      returnUrl : 'https://hc692t75rj.execute-api.ap-northeast-2.amazonaws.com/dev/return',
      closeUrl : ''
    }
    res.render('w_inicis', { ...dataset });
  }catch (error){
    console.log('error : ', error);
    return res.send({ status: 'error', data: 'error'});
  }
  
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/inicis/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/inicis', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/inicis/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/inicis', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/inicis/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
