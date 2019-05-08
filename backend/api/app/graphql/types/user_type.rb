module Types
  class UserType < Types::BaseObject
    description 'User'
    
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
  end
end
