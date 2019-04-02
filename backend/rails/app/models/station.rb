class Station < ApplicationRecord
  belongs_to :user
  has_many :weather_logs
end
