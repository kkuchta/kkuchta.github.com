module Jekyll
  require 'sass'
  class SassConverter < Converter
    safe true
    priority :low

     def matches(ext)
      ext =~ /scss/i
    end

    def output_ext(ext)
      ".css"
    end

    def convert(content)
      begin
        puts "HERE2!"
        engine = Sass::Engine.new(content, syntax: :scss)
        engine.render
      rescue StandardError => e
        puts "!!! SASS Error: " + e.message
      rescue
        puts "Some error here"
      end
    end
  end
  require 'haml'
  class HamlConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /haml/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      begin
        engine = Haml::Engine.new(content)
        engine.render
      rescue StandardError => e
          puts "!!! HAML Error: " + e.message
      end
    end
  end

end

