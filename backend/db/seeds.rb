# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

x = 1

while x <= 5 
  Device.create({
    name: "device#{x}",
    macaddress: "#{x}1:23:45:67"
  })
  x += 1
end