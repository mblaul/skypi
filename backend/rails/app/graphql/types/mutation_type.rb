module Types
  class MutationType < Types::BaseObject
    name "Mutation"

    field :signInUser function: Mutations::SignInUser.new
  end
end
