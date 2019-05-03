module Queries
  class CurrentUser < BaseQuery
    type Types::UserType, null: false
    description "Query all SomeResources"

    argument :token, String, required: true

    def resolve(token:)
      User.find(Knock::AuthToken.new(token: token).payload["sub"])
    end
  end
end