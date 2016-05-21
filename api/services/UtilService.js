var Promise = require('bluebird');
var jsdom = Promise.promisifyAll(require('jsdom'));
var qs = require('query-string');
var osuapi = require('osu-api');
var osu = Promise.promisifyAll(new osuapi.Api(sails.config.apiKey));

module.exports = {
    jsdom: jsdom,
    qs: qs,
    osu: osu
}
