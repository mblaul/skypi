Types::StationType = GraphQL::ObjectType.define do
  name 'Station'

  field :id !types.ID
  field :name !types.String
  field :mac_address !types.String
  field :ip_address !types.String
  field :latitude !types.Float
  field :longitude !types.Float

end