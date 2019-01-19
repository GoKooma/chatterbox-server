/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = [];

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  if (request.url === '/classes/messages') {
    var mongoObjectId = function () {
      var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
      return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
          return (Math.random() * 16 | 0).toString(16);
      }).toLowerCase();
    };

    if (request.method === 'GET') {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results}));
    } 
    
    if (request.method === 'POST') {
      request.on('data', (chunk) => {
        results.push(JSON.parse(chunk.toString()));
        results[results.length - 1].objectId = mongoObjectId();

      }).on('end', () => {
        results.concat(results);
        console.log(results);
        statusCode = 201;
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify('we did it!'));
      });
    } 
    
    if (request.method === 'OPTIONS') {
      response.writeHead(statusCode, headers);
      response.end();
    }

  } else {
    response.writeHead(404, headers);
    response.end(JSON.stringify('404: page not found'));
  }
  
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
module.exports.results = results;