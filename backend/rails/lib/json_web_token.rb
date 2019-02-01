require 'jwt'

class JsonWebToken

  ALGORITHM = 'HS256'

  def self.issue(payload)
    JWT.encode(payload, jwt_secret, ALGORITHM)
  end
  
  def self.decode(token)
     result = JWT.decode(
      token,
      jwt_secret,
      true,
      { algorithm: ALGORITHM }).first

    User.find_by(id: result[:user])
  end

  def self.jwt_secret 
    ENV["JWT_SECRET_KEY"]
  end
end
