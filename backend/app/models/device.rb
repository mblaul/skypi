class Device < ApplicationRecord
  validates :name, presence: true
  validates :macaddress, presence: true
end
