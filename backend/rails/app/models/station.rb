class Station < ApplicationRecord
  
  validates :name, presence: true, length: { maximum: 50 }
  VALID_MAC_REGEXP = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/i
  validates :mac_address, presence: true, format: { with: VALID_MAC_REGEXP }, uniqueness: { case_sensitive: false }

end
