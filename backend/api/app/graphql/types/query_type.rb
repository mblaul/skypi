module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    
    # Users
    field :current_user, resolver: Queries::CurrentUser
    field :user, resolver: Queries::User

    # Stations
    field :station, resolver: Queries::Station
    field :stations, resolver: Queries::Stations

    # Weather logs
    field :weather_logs, resolver: Queries::WeatherLogs
  end
end
