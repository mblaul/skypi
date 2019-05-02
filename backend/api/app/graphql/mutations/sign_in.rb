module Mutations
  class SignIn < BaseMutation
    null true 
    
    argument :auth, Types::SignInInputType, required: true

    field :token, String, null: true

    def resolve(auth: nil)
      return unless auth

      user = User.find_by email: auth[:email]

      return unless user
      return unless user.authenticate(auth[:password])

      token = Knock::AuthToken.new(payload: { sub: user.id }).token

      { token: token }
    end
  end
end