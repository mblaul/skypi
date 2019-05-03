module Mutations
  class SignUp < BaseMutation
    null true 
    
    argument :auth, Types::SignUpInputType, required: true

    field :token, String, null: true

    def resolve(auth: nil)
      return unless auth
       
      if auth[:password] != auth[:password_confirmation]
        return
      end

      user = User.find_by email: auth[:email]

      if user.present?
        return
      end

      user = User.create(
        first_name:  auth[:first_name],
        last_name: auth[:last_name],
        email: auth[:email],
        password: auth[:password]
      )

      token = Knock::AuthToken.new(payload: { sub: user.id }).token

      { token: token }
    end
  end
end