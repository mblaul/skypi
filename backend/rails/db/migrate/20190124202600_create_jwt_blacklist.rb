# Credit where credit's due:
# https://medium.com/@mazik.wyry/rails-5-api-jwt-setup-in-minutes-using-devise-71670fd4ed03

class CreateJwtBlacklist < ActiveRecord::Migration[5.0]
  def change
    create_table :jwt_blacklist do |t|
      t.string :jti, null: false
    end
    add_index :jwt_blacklist, :jti
  end
end