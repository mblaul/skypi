module Types
  class MutationType < Types::BaseObject

    field :sign_up, mutation: Mutations::SignUp,
      description: "An endpoint to register a new account and receive JWT token"

    field :sign_in, mutation: Mutations::SignIn,
      description: "An endpoint to sign in and receive JWT token"
      
  end
end
