module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :me, UserType, null: false,
      description: "the current user"
    def me
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end
      User.find_by(ctx[:current_user][:user])
    end

    field :stations, [StationType], null: false,
      description: "all of the stations"
    def stations
      Station.all
    end

  end
end
