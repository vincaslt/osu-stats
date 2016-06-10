var Promise = require('bluebird');

module.exports = {
    getPlayersFromAPI: function(playerIds) {
        var promises = playerIds.map(function(playerId) {
            return UtilService.osu.getUserAsync(playerId);
        });

        return Promise.all(promises);
    }
}
