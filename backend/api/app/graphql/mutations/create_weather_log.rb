module Mutations
  class CreateWeatherLog < BaseMutation
    null true 
    
    argument :weather_log_input, Types::WeatherLogInputType, required: true

    field :weather_log, Types::WeatherLogType, null: false

    def resolve(weather_log_input: nil)
      weather_log = WeatherLog.create(weather_log_input.to_h)
      { weather_log: weather_log }
    end
  end
end