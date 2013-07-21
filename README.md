Dominion Online User Extension
==============================

Discuss the extension at the [Dominion Strategy forum](http://goo.gl/4muRB).


Installation
------------
- Chrome - [get it from the Chrome web store](http://goo.gl/Y9AK5)
- Firefox - install [the main script](https://github.com/michaeljb/Goko-Live-Log-Viewer/raw/master/Goko_Live_Log_Viewer.user.js) as a [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) user script
- Opera - the extension is not currently available in the Opera store, but it may be added by downloading and unzipping the [project ZIP](https://github.com/michaeljb/Goko-Live-Log-Viewer/archive/master.zip) and following [these instructions](http://dev.opera.com/extension-docs/tut_basics.html#step_4_testing_your_extension)
- Safari - [download the extension file](http://goo.gl/aSxi9), and double-click on it to add it to Safari

Contributing
------------
1. Fork it
2. Keep modifications to `Goko_Live_Log_Viewer.user.js` and `set_parser.js`, in `features` (this keeps merging with [nutki's repo](github.com/nutki/Goko-Live-Log-Viewer) simple)
3. Keep all other changes in `master`; do not modify `VERSION`
4. Send a pull request

For testing on Safari, you will need to follow [these instructions](http://blog.streak.com/2013/01/how-to-build-safari-extension.html) to properly sign the package. Note that `safari/createAndSign.sh` is slightly modified from the script given there.
