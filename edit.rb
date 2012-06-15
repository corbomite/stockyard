require 'find'
replacements = 0

Find.find(".") do |path|
  if FileTest.directory?(path)
    puts "Skipping directory #{path}... \r\n"
    next
  else
    filename = File.basename(path)
    if filename =~ /\.htm/
      s = IO.read(path) 
      compliant = s.gsub(/stockyardmagazine/, "stockyardmag")
      replacements += 1 if s != compliant      
      File.open(path, 'w') {|f| f.write(compliant) }
    else
      puts "Skipping file #{filename}... \r\n"
    end
  end  
end

puts "Made #{replacements} replacements"
