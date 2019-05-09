module Queries
  class Station < BaseQuery
    type Types::StationType, null: false
    description "Get a station"
    
    argument :station_id, ID, required: true
    def resolve(station_id: nil)
      ::Station.find(station_id)
    end
  end

  class Stations < BaseQuery
    type [Types::StationType], null: false
    description "Get all stations"
    
    def resolve
      ::Station.all.limit(100)
    end
  end
end