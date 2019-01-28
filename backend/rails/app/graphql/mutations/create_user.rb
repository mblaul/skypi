module Mutations
  class CreateUser < GraphQL::Schema::Mutation
    class AuthProviderSignUpData < Types::BaseInputObject
      argument :email, Types::AuthProviderEmailInput, required: false
    end

    argument :auth_provider, AuthProviderSignUpData, required: false

    type Types::UserType

    def resolve(name: nil, auth_provider: nil)
      User.create!(
        email: auth_provider&.[](:email)&.[](:email),
        password: auth_provider&.[](:email)&.[](:password)
      )
    end
  end
end