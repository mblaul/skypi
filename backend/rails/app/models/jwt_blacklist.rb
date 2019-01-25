# Credit where credit's due:
# https://medium.com/@mazik.wyry/rails-5-api-jwt-setup-in-minutes-using-devise-71670fd4ed03

class JWTBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Blacklist

  self.table_name = 'jwt_blacklist'
end