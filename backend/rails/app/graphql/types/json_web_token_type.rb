module Types
  JsonWebTokenType = GraphQL::ObjectType.define do
    name "JsonWebToken"

    field :token, !types.String
  end
end