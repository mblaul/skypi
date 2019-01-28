module Types
  UserType = GraphQL::ObjectType.define do
    name "User"

    field :id, !types.Int
    field :email, !types.String 
  end
end