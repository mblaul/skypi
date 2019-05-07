class CreateWeatherLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :weather_logs do |t|
      t.references :station, foreign_key: true
      t.decimal :temperature, precision: 10, scale: 4
      t.decimal :humidity, precision: 10, scale: 4
      t.decimal :pressure, precision: 10, scale: 4
      t.decimal :latitude, precision: 10, scale: 4
      t.decimal :longitude, precision: 10, scale: 4
      t.decimal :wind_speed, precision: 10, scale: 4
      t.string :wind_direction

      t.timestamps
    end
  end
end
