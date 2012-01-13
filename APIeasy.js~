var http = require('http'),
    journey = require('journey');

var token, router = new jouney.Router({
    strict: false,
    strictUrls: false,
    api: 'basic'
});


function isAuthorized(req, body, next){
    return parseInt(req.headers['x-test-authorized'], 10) != token
        ? next(new journey.NotAuthorized())
        : next();
}
