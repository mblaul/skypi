module Mutations
  class RegisterUser < GraphQL::Schema::Mutation

    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    type Types::UserType

    def resolve(first_name: nil, last_name: nil, email: nil, password: nil)
      User.create!(
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      )
    end
  end
end