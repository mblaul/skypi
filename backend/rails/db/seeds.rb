# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


STATION_NAMES = 10.times.map { Faker::Pokemon.name }

Faker::Number.number(10)

SPLIT = 0.4
OFFSET = STATION_NAMES.length * SPLIT

USER_STATIONS = {
  'matt@skypi.com' => STATION_NAMES[0, OFFSET],
  'robert@weatherman.com' => STATION_NAMES[OFFSET..-1]
}

USER_STATIONS.each do |email, stations|
  user= User.new(email: email, password: 'secret')

  stations.each {|name| user.stations.build(name: name, mac_address: Faker::Number.number(10))}
  user.save
end