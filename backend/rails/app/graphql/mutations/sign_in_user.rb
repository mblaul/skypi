module Mutations
  class SignInUser < GraphQL::Schema::Mutation
    null true

    argument :email, Types::AuthProviderEmailInput, required: false

    field :token, String, null: true
    field :user, Types::UserType, null: true
    
    def resolve(email: nil)
      return unless email

      user = User.find_by email: email[:email]

      return unless user
      return unless user.authenticate_user!(email[:password])

      token = user.jwt_payload

      { user: user, token: token }
    end
  end
end