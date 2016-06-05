var Promise = require('bluebird');

module.exports = {
    getPlayersFromAPI: function(playerIds) {
        return new Promise(function(success, error) {
            var players = [];
            playerIds.forEach(function(playerId) {
                UtilService.osu.getUserAsync(playerId)
                    .then(function(player) {
                        if (players.push(player) >= 50) {
                            return success(players);
                        }
                    });
            });
        });
    }
}
