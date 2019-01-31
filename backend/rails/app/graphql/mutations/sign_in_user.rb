module Mutations
  class SignInUser < GraphQL::Schema::Mutation
    argument :email, Types::AuthProviderEmailInput, required: false

    field :user, Types::UserType, null: true
    field :token, String, null: true
    def resolve(email: nil)
      # basic validation
      return unless email
      user = User.find_by_email(email[:email])

      if user
        if user.valid_password?(email[:password])
          token = JsonWebToken.issue({user: user.id})
          {user: user, token: token}
        end
      end
    end
  end
end