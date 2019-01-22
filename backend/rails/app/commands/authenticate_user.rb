class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password)
    # @first_name = first_name
    # @last_name = last_name
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private
  
  attr_accessor :email, :password

  def user
    user = User.find_by_email(email)
    return user && user.authenticate(password)

    errors.add :user_authentication, 'Invalid username/password combination'
    nil
  end
end