module Queries
  class User < BaseQuery
    type Types::UserType, null: false
    description "Get user"
    
    argument :user_id, ID, required: true
    def resolve(user_id: nil)
      ::User.find(user_id)
    end
  end
end