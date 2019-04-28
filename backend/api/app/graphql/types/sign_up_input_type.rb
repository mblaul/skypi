module Types
  class SignUpInputType < Types::BaseInputObject
    graphql_name 'SIGN_UP'

    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true
  end
end