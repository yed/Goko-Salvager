# encoding: UTF-8

def versioned_name
  "#{NAME}-#{get_version}"
end

def insert_set_parser_into_main_script(out_file_name)
  out = File.new(out_file_name, 'w')
  out.write(File.read(PARSER))
  out.write(File.read(SCRIPT))
  out.close
end

def run_in_page_context(file)
  f = File.read(file)
  t = File.new(file, 'w')
  File.open(WRAPPER) do |w|
    w.each_line do |l|
      t.write(l.strip == '// insert file here' ? f : l)
    end
  end
  t.close
end

# TODO - set up the builds with proper dependencies
namespace :build do

  desc 'Create a .zip file for publishing in the Chrome store'
  task :chrome do
    insert_set_parser_into_main_script('chrome/Goko_Live_Log_Viewer.user.js')
    run_in_page_context('chrome/Goko_Live_Log_Viewer.user.js')
    sh "cd chrome && zip -r ../build/#{versioned_name}.zip . && cd -"
    puts "build/#{versioned_name}.zip created and ready to publish"
  end

  desc 'Create a signed .safariextz'
  task :safari do
    tmp_ext_dir = "#{NAME}.safariextension"
    FileUtils.mkdir_p tmp_ext_dir
    insert_set_parser_into_main_script("#{tmp_ext_dir}/#{SCRIPT}")
    run_in_page_context("#{tmp_ext_dir}/#{SCRIPT}")
    FileUtils.cp [SAFARI_INFO, SAFARI_SETTINGS],  tmp_ext_dir
    sh '#{ CREATE_AND_SIGN }'
    FileUtils.rm_rf tmp_ext_dir
    FileUtils.mv "#{NAME}.safariextz", "build/#{versioned_name}.safariextz"
    puts "build/#{versioned_name}.safariextz created"
  end
end
