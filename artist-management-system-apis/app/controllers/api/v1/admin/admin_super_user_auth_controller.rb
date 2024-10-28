class Api::V1::Admin::AdminSuperUserAuthController < ApplicationController
  include UserProtected
  def login
    begin
      puts "Incoming Request"
      existing_user=authenticate_user(user_params[:email], user_params[:password])
      if !existing_user.nil?
        payload = { id: existing_user[:id], email: existing_user[:email], role: existing_user[:role]  }
        token = JsonWebToken.encode(payload)
         @success_message="Login Successful."
        render json: token
      end
    rescue => e
      raise e
    end
  end


  def authMe
    user_details=get_user
    render json: user_details
  end

  def user_params
    params.require(:superAdmin).permit(:email, :password)
  end

  def authenticate_user(email, password)
    @super_admin_repo=SuperAdminRepository.new
    existing_super_admin=@super_admin_repo.findOneDeletedFalse(:email, email)
    if existing_super_admin && existing_super_admin.authenticate(password)
      existing_super_admin
    else
      raise ErrorHelper::Error.new(401, "Invalid Credential")
    end
  end

  protected_action :authMe
end
