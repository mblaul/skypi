module Types
  class WeatherLogInputType < Types::BaseInputObject
    graphql_name 'WEATHER_LOG'

    argument :temperature, Float, required: false
    argument :humidity, Float, required: false
    argument :pressure, Float, required: false
    argument :latitude, Float, required: false
    argument :longitude, Float, required: false
    argument :wind_speed, Float, required: false
    argument :wind_direction, String, required: false
    argument :station_id, ID, required: true
  end
end