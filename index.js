function getAcceptType(req) {

  if(req.params.ext === 'json') {
    return 'json'; 
  } else if(req.params.ext === 'xml') {
    return 'xml'; 
  } else if(req.params.ext === 'graph') { 
    return 'graph'; 
  } else if(req.params.ext === 'html') { 
    return 'html'; 
  } else if (/application\/json/.test(req.get('accept'))) {
    return 'json';
  } else if(/text\/html/.test(req.get('accept'))) {
    return 'html';
  } else if(/application\/xml/.test(req.get('accept'))) {
    return 'xml';
  } else {
    return 'html'; 
  }
}

const ResTypes = {
  json: 'application/json',
  xml: 'text/xml',
  html: 'text/html'
};

// data is optional and only used in adapters 
module.exports = function responseFormat(cb, data) {
  
  return (req, res) => {
    
    let acceptType = getAcceptType(req);

    cb(req, res, {
      use(useType, handler) {

        if (useType === acceptType) {
          let resType = ResTypes[useType];
          res.setHeader('Content-Type', resType);
          // finally execute the handler
          // data is optional and only used in adapters 
          handler(res, data); 
        }
        return this;
      } 
    });
  };
};
