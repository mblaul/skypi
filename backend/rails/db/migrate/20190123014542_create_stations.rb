class CreateStations < ActiveRecord::Migration[5.0]
  def change
    drop_table :devices
    create_table :stations do |t|
      t.string :name
      t.string :mac_address
      t.string :ip_address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
