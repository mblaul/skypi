module Types
  UserType = GraphQL::ObjectType.define do
    name "User"

    field :firstName, !types.String, property: :first_name
    field :lastName, !types.String, property: :last_name
    field :id, !types.Int
    field :email, !types.String 
  end
end