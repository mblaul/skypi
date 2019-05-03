class CreateWeatherLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :weather_logs do |t|
      t.references :user, foreign_key: true
      t.references :station, foreign_key: true
      t.decimal :temperature
      t.decimal :humidity
      t.decimal :pressure
      t.decimal :latitude
      t.decimal :longitude
      t.string :wind_speed
      t.string :decimal
      t.string :wind_direction

      t.timestamps
    end
  end
end
