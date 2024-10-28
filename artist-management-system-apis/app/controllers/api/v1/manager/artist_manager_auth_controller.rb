class Api::V1::Manager::ArtistManagerAuthController < ApplicationController
  include UserProtected
  def login
    begin
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

  def infoMe
    @manager_repo=ArtistManagerRepository.new
    my_id=get_user
    my_info=@manager_repo.findById(my_id[:id])
    render json: my_info, serializer: ArtistManagerSerializer
  end

  def user_params
    params.require(:manager).permit(:email, :password)
  end

  def authenticate_user(email, password)
    @artist_manager_repo=ArtistManagerRepository.new
    existing_artist_manager=@artist_manager_repo.findOneDeletedFalse(:email, email)
    if existing_artist_manager && existing_artist_manager.authenticate(password)
      existing_artist_manager
    else
      raise ErrorHelper::Error.new(401, "Invalid Credential")
    end
  end

  protected_action :authMe, :infoMe
end
