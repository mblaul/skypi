class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JWTBlacklist

  def jwt_payload
    { 
      'id' => :id,
      'first_name' => :first_name,
      'last_name' => :last_name,
      'email' => :email
    }
  end
  
  has_many :stations
end
