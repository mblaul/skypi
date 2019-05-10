module Mutations
  class CreateWeatherLog < BaseMutation
    null true 
    
    argument :weather_log, Types::WeatherLogInputType, required: true

    field :weather_log, Types::WeatherLogType, null: false

    def resolve(weather_log: nil)
      station_id = weather_log[:station_id]
      temperature = weather_log[:temperature]
      WeatherLog.create(
        station_id: station_id,
        temperature: temperature
      )
    end
  end
end