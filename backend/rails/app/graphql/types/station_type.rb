module Types
  StationType = GraphQL::ObjectType.define do
    name "Station"

    field :name, !types.String
    field :macAddress, !types.Int, property: :mac_address

    field :user, !UserType
   end
end