class CreateWeatherLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :weather_logs do |t|
      t.references :station, foreign_key: true
      t.decimal :latitude
      t.decimal :longitude
      t.decimal :temperature
      t.decimal :humidity
      t.decimal :pressure

      t.timestamps
    end
  end
end
