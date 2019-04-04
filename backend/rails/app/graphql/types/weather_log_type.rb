module Types
  class WeatherLogType < Types::BaseObject
    field :id, ID, null: false
    field :latitude, Float, null: true
    field :longitude, Float, null: true
    field :temperature, Float, null: true
    field :humidity, Float, null: true
    field :pressure, Float, null: true
    
    ##TODO add datetime for created/updated at
  end
end
