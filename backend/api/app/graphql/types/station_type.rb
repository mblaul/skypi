module Types
  class StationType < Types::BaseObject
    description 'Station'

    field :id, ID, null: false
    field :name, String, null: false
    field :mac_address, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user, Types::UserType, null: false
    def user
      ::User.find(object[:user_id])
    end
    field :weather_logs, [Types::WeatherLogType], null: true
    def weather_logs
      ::WeatherLog.where(station_id: object[:id])
    end
  end
end
