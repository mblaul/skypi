module Mutations
  class SignIn < BaseMutation
    null true 
    
    argument :fields, Types::SignInInputType, required: true

    field :user, Types::UserType, null: true

    def resolve(fields: nil)
      return unless fields

      user = User.find_by email: fields[:email]

      return unless user
      return unless user.authenticate(fields[:password])

      { user: user }
      # return token here
    end
  end
end