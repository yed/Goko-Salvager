/*jslint browser: true, devel: true, indent: 4, maxlen: 80, es5: true */
/*global jQuery, $, FS, WebSocket */

var defineGokoHelperFunctions = function () {
    "use strict";   // JSLint setting

    var AM = window.AM = (window.AM || {});

    FS.MeetingRoom.prototype.getGamesOwnedBy = function (hostname) {
        var room = this.helpers.ZoneClassicHelper.currentRoom;
        return room.get('tableList').models.filter(function (t) {
            return t.has('owner');
        }).filter(function (t) {
            return t.get('owner').get('player').get('playerName') === hostname;
        });
    };

    FS.MeetingRoom.prototype.getRoomByName = function (roomName) {
        return this.roomList.models.filter(function (m) {
            return m.get('name') === roomName;
        })[0];
    };

    // Note: Goko will ignore the kingdom for pro games
    FS.MeetingRoom.prototype.createGame = function (num, rsys, kingdom, title) {
        var sets, opts, ss;
        // Create a "seat state" like [true, true, false, false, false, false]
        ss = [1, 2, 3, 4, 5, 6].map(function (i) {
            return i <= num;
        });
        sets = {name: (title || "New Game"),
                seatsState: ss,
                gameData: {uid: ""},
                kingdomCards: kingdom,
                platinumColony: false,
                useShelters: false,
                ratingType: rsys};
        opts = {settings: JSON.stringify(sets),
                isLock: false,
                isRequestJoin: false,
                isRequestSit: false,
                tableIndex: null};
        this.getHelper('ZoneClassicHelper').createTable(opts);
    };
};

// Execute our code in Goko's JS context by appending it to the document
var script = document.createElement('script');
script.textContent = '(' + defineGokoHelperFunctions + ')();';
document.body.appendChild(script);
