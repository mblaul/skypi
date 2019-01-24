class CreateStations < ActiveRecord::Migration[5.0]
  def change
    create_table :stations do |t|
      t.string :name
      t.string :mac_address
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
