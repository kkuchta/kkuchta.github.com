desc "Parse haml layouts"
task :parse_haml do
  print "Parsing Haml layouts..."
  parseHaml( '_layouts/haml' );
  print "Parsing Haml includes..."
  parseHaml( '_includes/haml' );
  puts "done."
end

# Takes all haml files in the current directory, compiles them, and puts the
# resulting html in the parent directory.
def parseHaml( directory )
  print "Parsing Haml in " + directory + "..."
  system(%{
    cd #{directory} && 
    for f in *.haml; do [ -e $f ] && haml $f ../${f%.haml}.html; done
  })
  puts "done."
end
