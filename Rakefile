# encoding: UTF-8

require 'rake/clean'

CLEAN.include Dir.glob('./**/*~')
CLEAN.include Dir.glob('./**/.*~')
CLEAN.add 'images/'
CLEAN.add 'manifest.json'
CLEAN.add 'chrome/*.js'
CLOBBER.add '*.zip'
CLOBBER.add '*.safariextz'

@script = 'Goko_Live_Log_Viewer.user.js'
@parser = 'set_parser.js'

# first line inside the main function of @script
@start_of_foo = 13

# content of the first line in @parser to import @script
@import_start = "	script.src = 'http://dom.retrobox.eu/js/1.0.0/set_parser.js';
"

# content of the first line in @script after the importing of @parser is complete
@after_import_end = "	script.textContent = '('+ fn +')();';
"

@name = 'Dominion-Online-User-Extension'
@version = File.read('VERSION').strip!
@versioned_name = "#{@name}-#{@version}"

def insert_set_parser_into_main_script(out_file_name)
  out = File.new(out_file_name, 'w')
  File.open(@script) do |script|
    current_line = 1
    skip_this_line = false
    script.each_line do |line|
      out.write(File.read(@parser)) if current_line == @start_of_foo
      skip_this_line = true if line == @import_start
      skip_this_line = false if line == @after_import_end
      out.write(line) unless skip_this_line
      current_line += 1
    end
  end
  out.close
end

desc 'Use this directory as an "unpacked extension" for developing on Chrome'
task :chrome_dev do
  FileUtils.cp_r ['chrome/images', 'chrome/manifest.json'], '.'
  puts 'ready to use this directory as unpacked extension'
end

desc 'Create a .zip file for publishing in the Chrome store'
task :chrome_publish do
  insert_set_parser_into_main_script "chrome/#{@script}"
  sh "zip -r #{@versioned_name}.zip chrome"
  puts "#{@versioned_name}.zip created and ready to publish"
end

desc 'Create a Safari extension file for development'
task :safari_dev do
  tmp_ext_dir = "#{@name}.safariextension"
  FileUtils.mkdir_p tmp_ext_dir
  insert_set_parser_into_main_script "#{tmp_ext_dir}/#{@script}"
  FileUtils.cp ['safari/Info.plist', 'safari/Settings.plist'],  tmp_ext_dir
  sh 'safari/createAndSign.sh'
  FileUtils.rm_rf tmp_ext_dir
  FileUtils.mv "#{@name}.safariextz", "#{@name}-dev.safariextz"
  puts "#{@name}-dev.safariextz created"
end

desc 'Create a versioned Safari extension file for publishing'
task :safari_publish => [:safari_dev] do
  FileUtils.mv "#{@name}-dev.safariextz", "#{@versioned_name}.safariextz"
  puts "#{@name}-dev.safariextz renamed to #{@versioned_name}.safariextz"
end

desc 'Use this directory as an "unpacked extension" for developing on Opera'
task :opera_dev => [:chrome_dev]

desc 'Create a .zip file for publishing in the Opera store'
task :opera_publish => [:chrome_publish]
