# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# Create some users
users = User.create([
  { first_name: 'Matt', last_name: 'Smith', email: 'mattsmith@gmail.com', password: 'awesomepass123'},
  { first_name: 'Karen', last_name: 'Gillan', email: 'karengillan@gmail.com', password: 'awesomepass123'}
])


stations = Station.create([
  { name: 'Detroit_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'mattsmith@gmail.com').id },
  { name: 'Detroit_2', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'karengillan@gmail.com').id },
  { name: 'Washington_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'mattsmith@gmail.com').id },
  { name: 'Portland_1', mac_address: Faker::Internet.mac_address, user_id: User.find_by(email: 'karengillan@gmail.com').id }
])


