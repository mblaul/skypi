module Queries
  class CurrentUser < BaseQuery
    type Types::UserType, null: false
    description "Get current user"

    def resolve
      User.find(context[:current_user])
    end
  end
end