var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
    // Modify goko gameClient.html pages
    include: ["http://play.goko.com/Dominion/gameClient.html*",
              "https://play.goko.com/Dominion/gameClient.html*",
              "http://beta.goko.com/Dominion/gameClient.html*",
              "https://beta.goko.com/Dominion/gameClient.html*"],

    // - start (=when document element inserted)
    // - ready (=DOMContentLoaded)
    // - end (=onload event)
    contentScriptWhen: "ready",

    // Run the extension scripts in the Firefox JS context
    contentScriptFile: [ self.data.url("gokoHelpers.js"),
                         self.data.url("automatchSeekPop.js"),
                         self.data.url("automatchOfferPop.js"),
                         self.data.url("automatchGamePop.js"),
                         self.data.url("automatch.js") ]
});
