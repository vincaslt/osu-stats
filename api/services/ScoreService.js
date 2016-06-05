var Promise = require('bluebird');

module.exports = {
    parseTopPlayers: function(from, to) {
        var maxPage = 1 + Math.floor((to - 1) / 50);
        var minPage = 1 + Math.floor((from - 1) / 50);
        var pagesLeft = 1 + maxPage - minPage;
        sails.log('Pages left: ' + pagesLeft);

        var promises = [];

        for (var page = minPage; page <= maxPage; page++) {
            promises.push(new Promise(function(resolve) {
                setTimeout(resolve, page * sails.config.application.parseThrottling, page);
            }).then(ScoreService.parsePlayersFromPage));
        }

        return Promise.all(promises).then(function(playerArrays) {
            var players = [].concat.apply([], playerArrays);
            var topPlayers = players.filter(function(player) {
                return player.pp_rank >= from && player.pp_rank <= to;
            });
            var sortedPlayers = topPlayers.sort(function(a, b) {
                return a.pp_rank - b.pp_rank;
            });
            return sortedPlayers;
        });
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
