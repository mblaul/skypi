module Mutations
  class SignIn < BaseMutation
    null true 
    
    argument :auth, Types::SignInInputType, required: true

    field :user, Types::UserType, null: true

    def resolve(auth: nil)
      return unless auth

      user = User.find_by email: auth[:email]

      return unless user
      return unless user.authenticate(auth[:password])

      { user: user }
      # return token here
    end
  end
end