class Api::V1::Admin::AdminSuperUserArtistController < ApplicationController
  include UserProtected
  # List all Users with manual pagination
  def list
    @artist_repo=ArtistRepository.new
    repo= @artist_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "name", "email", "gender", "address", "first_release_year", "no_of_albums_released" ], search_fields: [ "first_name", "last_name", "email", "phone" ], search: params[:search], join_options: [] })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  # Get By Id
  def getById
    begin
    @artist_repo=ArtistRepository.new
    user_by_id=@artist_repo.findById(params[:id], options: {})
    if user_by_id.nil?
      raise ErrorHelper::Error.new(404, "User not found")
    end
    @success_message ="Fetched User By Id"
    render json: user_by_id, serializer: ArtistSerializer
    rescue => e
      raise e
    end
  end

  # Create new User
  def create
    begin
      validateUserConflit(user_params[:email])
      gender_value = GenderEnum::GENDERS[user_params[:gender].to_s.downcase.to_sym] if user_params[:gender].present?
      updated_params = user_params.merge(role: Artist.roles[:artist], deleted_at: nil, gender: gender_value)
      @artist_repo=ArtistRepository.new
      user = @artist_repo.create(updated_params)
      @success_message ="Created Successfully."
      render json: user, serializer: ArtistSerializer
    rescue => e
      # Handle any errors and log them
      raise e
    end
  end

  def update
    begin
      @artist_repo = ArtistRepository.new
      existingUser=@artist_repo.findById(params[:id])
      if !existingUser
        raise ErrorHelper::Error.new(404, "User not found")
      end
      updated_user = @artist_repo.update(params[:id], update_user_params)
      @success_message="Updated Successfully."
      render json: updated_user, serializer: ArtistSerializer
    rescue => e
      raise e
    end
  end


  def softDelete
    begin
      @artist_repo=ArtistRepository.new
      existingData=@artist_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_repo.softDelete(params[:id])
      @success_message ="Deleted Successfully."
      render json: deleted_data, serialize: ArtistSerializer
    rescue =>e
      raise e
    end
  end

  def hardDelete
    begin
      @artist_repo=ArtistRepository.new
      existingData=@artist_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_repo.hardDelete(params[:id])
      @success_message="Deleted Successfully."
      render json: { data: deleted_data[:id] }
    rescue => e
      raise e
    end
  end

  def restore
    begin
      @artist_repo=ArtistRepository.new
      existingData=@artist_repo.findById(params[:id], options: { deleted_at: "true" })
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_repo.restore(params[:id])
      @success_message ="Restored Successfully."
      render json: deleted_data, serialize: ArtistSerializer
    rescue =>e
      raise e
    end
  end


  def validateUserConflit(email)
    @artist_repo = ArtistRepository.new
    existingUserByEmail=@artist_repo.findOneDeletedFalse(:email, email)
    if existingUserByEmail
      raise ErrorHelper::Error.new(409, "Email with that user already exists")
    end
  end

  def user_params
    params.require(:artist).permit(:name, :email, :password, :dob, :gender, :address, :role, :deleted_at, :first_release_year, :no_of_albums_released)
  end

  def update_user_params
    params.require(:artist).permit(:name, :password, :gender, :dob, :address, :first_release_year, :no_of_albums_released)
  end

  protected_action :create, :update, :softDelete, :hardDelete, :restore, :getById, :list
end
