# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# # Create  users
# users = User.create([
#   { first_name: 'Matt', last_name: 'Smith', email: 'mattsmith@gmail.com', password: 'awesomepass123'},
#   { first_name: 'Karen', last_name: 'Gillan', email: 'karengillan@gmail.com', password: 'awesomepass123'}
# ])

# # Create stations
# stations = Station.create([
#   { name: 'Detroit_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'mattsmith@gmail.com').id },
#   { name: 'Detroit_2', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'karengillan@gmail.com').id },
#   { name: 'Washington_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'mattsmith@gmail.com').id },
#   { name: 'Portland_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'karengillan@gmail.com').id }
# ])

def seed_weather_logs
  stations = Station.where(id: 1..4)
  coordinates = [
     { latitude: 42.3314, longitude: 83.0458 },
     { latitude: 42.3314, longitude: 83.0458 },
     { latitude: 38.9072, longitude: 77.0369 },
     { latitude: 45.5155, longitude: 122.6793 }
  ]
  directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

  stations.each do |station|
    7.times do |index|
      WeatherLog.create(
        station_id: station.id,
        temperature: rand(15.0...21.0).truncate(4),
        humidity: rand(0.0...1.0).truncate(4),
        pressure: rand(20.0...30.0).truncate(4),
        latitude: coordinates[station.id - 1][:latitude],
        longitude: coordinates[station.id - 1][:longitude],
        wind_speed: rand(8.0...12.0).truncate(4),
        wind_direction: directions.sample,
        created_at: Time.now - index.days
      )
    end  
  end
end

# Create weather logs
seed_weather_logs
