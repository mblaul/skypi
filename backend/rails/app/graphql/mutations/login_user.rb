module Mutations
  class LoginUser < GraphQL::Schema::Mutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :token, String, null: true

    def resolve(email: nil, password: nil)
      # basic validation
      return unless email
      user = User.find_by_email(email)

      if user
        if user.valid_password?(password)
          token = JsonWebToken.issue({
            user: user.id,
            issued_at: Time.now,
            expires_at:  Time.now.advance({ days: 30 })
          })
          { token: token }
        end
      end
    end
  end
end