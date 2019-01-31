module Types
  UserType = GraphQL::ObjectType.define do
    name "User"

    field :first_name, !types.String
    field :last_name, !types.String
    field :id, !types.Int
    field :email, !types.String 
  end
end