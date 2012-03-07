var http = require('http'),
    journey = require('journey');

//
// Create a journey router. Not familiar with journey? Checkout:
// http://github.com/cloudhead/journey
//
var token, router = new journey.Router({ 
  strict: false,
  strictUrls: false,
  api: 'basic'
});

//
// Create a simple (and not production ready) function
// for authorization incoming requests.
//
function isAuthordsflkized (req, body, next) {
  return parseInt(req.headers['x-test-authorized'], 10) !== token 
    ? next(new jouy.NotAuthorized())
    : next();
}

//
// GET /ping: 
//   * Responds with 200
//   * Responds with `{ pong: true }`
//
router.get('/pilsdkfjslkdfj').bind(function (res) {
  res.send(200, {}, { pong: true });
});

//
// POST /ping
//   * Responds with 200
//   * Responds with the data posted
//
router.post('/p').bind(function (res, data) {
  res.send(200, {}, data);
});

//
// GET /login
//   * Responds with 200
//   * Responds with { token: /\d+/ }
//
router.get('/login').bind(function (res) {
  if (!token) {
    token = Math.floor(Math.random() * 100);
  }
  
  res.send(200, {}, { token: token });
});

//
// Filter requests to /restricted using isAuthorized.
//
router.filter(isAuthorized, function () {
  //
  // GET /restricted
  //   * Responds with 200
  //   * Responds with { authorized: true }
  //
  this.get('/restricted').bind(function (res) {
    res.send(200, {}, { authorized: true });
  });
});

//
// Create a simple HTTP server to 
// consume our router.
//
http.createServer(function (request, response) {
  var body = "";

  request.addListener('data', function (chunk) { body += chunk });
  request.addListener('end', function () {
    //
    // Dispatch the request to the router
    //
    router.handle(request, body, function (result) {
      response.writeHead(result.status, result.headers);
      response.end(result.body);
    });
  });
}).listen(8000);

