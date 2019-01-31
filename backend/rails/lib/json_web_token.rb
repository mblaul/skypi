require 'jwt'

class JsonWebToken

  ALGORITHM = 'HS256'

  def self.issue(payload)
    JWT.encode(payload, jwt_secret, ALGORITHM)
  end
  
  def self.decode(token)
    JWT.decode(
      token,
      jwt_secret,
      true,
      { algorithm: ALGORITHM }).first
  end

  def self.jwt_secret 
    ENV["JWT_SECRET_KEY"]
  end
end
