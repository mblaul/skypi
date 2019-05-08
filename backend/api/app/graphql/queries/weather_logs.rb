module Queries
  class WeatherLogs < BaseQuery
    type [Types::WeatherLogType], null: false
    description "Get weather logs"
    
    def resolve
      ::WeatherLog.all.limit(100)
    end
  end
end