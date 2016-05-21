var Promise = require('bluebird');

module.exports = {
    parseTopPlayers: function() {

    },

    parsePlayersFromPage: function(page) {
        var url = sails.config.application.osuApiUrl + '?' + UtilService.qs.stringify({m: 0, s: 3, o: 1, page: page})
        return UtilService.jsdom.envAsync(url, ["http://code.jquery.com/jquery.js"])
            .then(function(window) {
                var rows = window.$('.beatmapListing .row1p, .beatmapListing .row2p');
                var playerIds = [];
                rows.each(function() {
                    playerIds.push(Number(window.$(this).find('a').attr('href').slice(3)));
                });
                return PlayerService.getPlayersFromAPI(playerIds).then(function(players) {
                    sails.log('Done loading page ' + page);
                    return players;
                });
            });
    },

    collectTopPlayers: function() {

    }
}
