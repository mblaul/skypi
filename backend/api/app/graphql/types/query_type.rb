module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :current_user, resolver: Queries::CurrentUser
    field :user, resolver: Queries::User
    field :weather_logs, resolver: Queries::WeatherLogs
  end
end
