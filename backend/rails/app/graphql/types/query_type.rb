module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    name "Query"
    
    field :stations, !types[Types::StationType] do
      resolve -> (obj, args, ctx) {
        Station.all
      }

  end
end
