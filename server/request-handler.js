/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
let results = [];

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'text/plain';

  response.writeHead(statusCode, headers);

  if (request.url === "/classes/messages") {

    if (request.method === "GET") {
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results}));

    } else if (request.method === "POST") {
      request.on('data', (chunk) => {
        results.push(JSON.parse(chunk.toString()));
      });
      
      statusCode = 201;
      response.writeHead(statusCode, headers);

      response.end("201: Message posted");
    }

  } else {
    response.writeHead(404, headers);
    response.end("404: Page not found");
  }
  
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;