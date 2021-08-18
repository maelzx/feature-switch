const express     = require('express');
const bodyParser  = require('body-parser');
const router      = express.Router();
const jsonParser  = bodyParser.json();
const feature     = require('../model/feature');

function checkRequest(req, res, next) {

  // check if get method and having query parameter
  if (req.method == "GET" && req.query) {
    
    // check if the expected parameter exist
    if (!('email' in req.query) || !('featureName' in req.query)) {
      
      // one of the required item not available
      res.send({'status': 'failed', 'error': 'email or featureName is missing.'});
    
    } else {
      
      next();
    
    }
  
  // check if post method and having correct parameter in body
  } else if (req.method == "POST" && req.body) {
    
    // check if the expected parameter exist
    if (!('featureName' in req.body) || !('email' in req.body) || !('enable' in req.body)) {
      
      // one of the required item not available
      res.send({'status': 'failed', 'error': 'featureName, email or enable is missing.'});
    
    } else {
      
      next();
    
    }
  
  } else {
    
    // unrecognise request, not get/post & dont have the expected parameter
    res.send({'status': 'failed', 'error': 'Unrecognised request.'});
  
  }

}

// access to /feature url via get
router.get('/', checkRequest, async function(req, res) {

  // get the query parameter
  const email       = req.query.email;
  const featureName = req.query.featureName;
  
  // get data from db
  const f = await feature.findOne({
    where: {
      email: email,
      name: featureName
    }
  });

  // check if data exist
  if (f){

    // response object default
    response = {
      "canAccess": false,
    }

    // if true then set value to true
    if (f.get('enable')) {
      
      response.canAccess = true;
    
    }

    // send the response
    res.send(response);
    
  } else {
    
    // when data dont exist, response error
    res.send({'status': 'failed', 'error': 'Data cannot be found.'});
  
  }

});

// access to /feature url via post
router.post('/', jsonParser, checkRequest, async function(req, res) {

  const email       = req.body.email;
  const featureName = req.body.featureName;
  const enable      = req.body.enable;

  // get data from db
  const f = await feature.findOne({
    where: {
      email: email,
      name: featureName
    }
  });

  // when data exist
  if (f){

    // when no changes at enable value
    if (f.get('enable') == enable) {
      
      // return http 304
      res.sendStatus(304);
    
    // when having changes at enable value
    } else {

      const id = f.get('id');

      const update = await feature.update(
        {enable: enable},
        {where: {
            id: id
          }
        }
      )

      if (update > 0) {

        // return http 200
        res.sendStatus(200);

      } else {

        // unexpected result
        res.send({'status': 'failed', 'error': 'Unable to process data.'});

      }

      
    }

  // when data doesnt exist
  } else {

    // create the data
    const create = await feature.create({
      name: req.body.featureName, 
      email: req.body.email,
      enable: req.body.enable 
    });
    
    if (create && create.id > 0) {
      
      res.sendStatus(200);
    
    } else {
      
      // having some issues ?
      res.send({'status': 'failed', 'error': 'Unable to process data.'});
    
    } 
  
  }
  
});

//Return router
module.exports = router;