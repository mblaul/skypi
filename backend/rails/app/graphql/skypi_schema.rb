
class SkypiSchema < GraphQL::Schema
  # require 'types/mutation_type'
  # require 'types/query_type'
  mutation(Types::MutationType)
  query(Types::QueryType)
end
