module Types
  class WeatherLogType < Types::BaseObject
    description 'Weather Log'
    
    field :id, ID, null: false
    field :temperature, Float, null: true
    field :humidity, Float, null: true
    field :pressure, Float, null: true
    field :latitude, Float, null: true
    field :longitude, Float, null: true
    field :wind_speed, Float, null: true
    field :wind_direction, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :station, Types::StationType, null: false
    def station
      Station.find(object[:station_id])
    end
  end
end
