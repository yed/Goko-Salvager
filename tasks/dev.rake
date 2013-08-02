# encoding: UTF-8

DEV_BROWSER_INFO = {
  chrome: {
    'tmp/manifest.json' => CHROME_MANIFEST,
    'tmp/images/' => CHROME_IMAGES,
    'tmp/' => 'src/ext/*'
  }
}

namespace :dev do
  DEV_BROWSER_INFO.each do |browser, info|
    info.each do |target, src|
      file target => src do
        FileUtils.mkdir_p 'tmp'
        FileUtils.cp_r src, target
      end
    end
  end

  desc 'Use this directory as an "unpacked extension" for developing on Chrome (or Opera)'
  task chrome: DEV_BROWSER_INFO[:chrome].keys do
    puts 'ready to use tmp/ as unpacked extension'
  end
end
