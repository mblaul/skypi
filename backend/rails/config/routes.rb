Rails.application.routes.draw do

  devise_for  :users,
              path: '',
              path_names: {
                sign_in: 'login',
                sign_out: 'logout',
                registration: 'signup'
              },
              controllers: {
                sessions: 'sessions',
                registrations: 'registrations'
              }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/api"
  end

  post "/api", to: "graphql#execute"


end
