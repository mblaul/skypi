module Types
  class MutationType < Types::BaseObject

    field :sign_in, mutation: Mutations::SignIn,
      description: "An endpoint to sign in and receive JWT token"
      
  end
end
