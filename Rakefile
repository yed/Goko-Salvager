# encoding: UTF-8

require 'rake/clean'

CLEAN.include 'tmp/*'
CLOBBER.include 'build/*'

SCRIPT = 'src/ext/Goko_Live_Log_Viewer.user.js'
PARSER = 'src/ext/set_parser.js'

CREATE_AND_SIGN = 'src/dev/createAndSign.sh'
WRAPPER = 'src/dev/runInPageContext.js'

VERSION = 'VERSION'

CHROME_MANIFEST = 'chrome/manifest.json'
CHROME_IMAGES = 'chrome/images/'

SAFARI_INFO = 'safari/Info.plist'
SAFARI_SETTINGS = 'safari/Settings.plist'

NAME = 'Dominion-Online-User-Extension'

def get_version
  File.read(VERSION).strip
end

def replace_pattern_in_file(old_pattern, new_string, target)
  text = File.read(target).gsub(/#{old_pattern}/, "#{new_string}")
  File.open(target, 'w') { |f| f.puts text }
end

Dir.glob('tasks/*.rake').each { |r| import r }
