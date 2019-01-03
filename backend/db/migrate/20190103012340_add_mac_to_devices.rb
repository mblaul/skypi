class AddMacToDevices < ActiveRecord::Migration[5.2]
  def change
    add_column :devices, :mac, :string
  end
end
