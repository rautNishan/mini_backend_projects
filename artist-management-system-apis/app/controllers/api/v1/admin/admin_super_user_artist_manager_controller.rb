class Api::V1::Admin::AdminSuperUserArtistManagerController < ApplicationController
  include UserProtected
  # List all Super Users with manual pagination
  def list
    @artist_manager_repo=ArtistManagerRepository.new
    repo= @artist_manager_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "first_name", "last_name", "email", "phone", "gender", "dob", "address" ], search_fields: [ "first_name", "last_name", "email", "phone" ], search: params[:search], join_options: [], sort_by: params[:sortBy], sort_order: params[:sortOrder], sortable_fields: [ "id", "created_at", "phone", "email" ] })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  def listDeletedOnly
    @artist_manager_repo=ArtistManagerRepository.new
    repo= @artist_manager_repo.listOnlyDeleted(options: { page: params[:page], per_page: params[:per_page], select: [ "id", "first_name", "last_name", "email", "phone", "gender", "dob", "address"  ], search_fields: [ "first_name", "last_name", "phone", "email" ], search: params[:search], join_options: [], sort_by: params[:sortBy], sort_order: params[:sortOrder], sortable_fields: [ "id", "created_at", "phone", "email" ] })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  # Get By Id
  def getById
    begin
    @artist_manager_repo=ArtistManagerRepository.new
    user_by_id=@artist_manager_repo.findById(params[:id], options: {})
    if user_by_id.nil?
      raise ErrorHelper::Error.new(404, "User not found")
    end
    @success_message ="Fetched User By Id"
    render json: user_by_id, serializer: ArtistManagerSerializer
    rescue => e
      raise e
    end
  end

  # Create new User
  def create
    begin
      validateUserConflit(user_params[:email], user_params[:phone])
      gender_key = user_params[:gender].to_s.downcase.to_sym
      gender_value = GenderEnum::GENDERS[gender_key] || GenderEnum::GENDERS[:others]
      updated_params = user_params.merge(role: ArtistManager.roles[:artistManager], deleted_at: nil, gender: gender_value)
      @artist_manager_repo=ArtistManagerRepository.new
      user = @artist_manager_repo.create(updated_params)
      @success_message ="Created Successfully."
      render json: user, serializer: ArtistManagerSerializer
    rescue => e
      # Handle any errors and log them
      raise e
    end
  end

  def update
    begin
      @artist_manager_repo = ArtistManagerRepository.new
      existingUser=@artist_manager_repo.findById(params[:id])
      if !existingUser
        raise ErrorHelper::Error.new(404, "User not found")
      end
      updated_user = @artist_manager_repo.update(params[:id], update_user_params)
      @success_message="Updated Successfully."
      render json: updated_user, serializer: ArtistManagerSerializer
    rescue => e
      raise e
    end
  end


  def softDelete
    begin
      @artist_manager_repo=ArtistManagerRepository.new
      existingData=@artist_manager_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_manager_repo.softDelete(params[:id])
      @success_message ="Artist Manager Deleted Successfully."
      render json: deleted_data, serialize: ArtistManagerSerializer
    rescue =>e
      raise e
    end
  end

  def hardDelete
    begin
      @artist_manager_repo=ArtistManagerRepository.new
      existingData=@artist_manager_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_manager_repo.hardDelete(params[:id])
      @success_message="Artist Manager Deleted Successfully."
      render json: { data: deleted_data[:id] }
    rescue => e
      raise e
    end
  end

  def restore
    begin
      @artist_manager_repo=ArtistManagerRepository.new
      existingData=@artist_manager_repo.findById(params[:id], options: { deleted_at: "true" })
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@artist_manager_repo.restore(params[:id])
      @success_message ="Artist Manager Restored Successfully."
      render json: deleted_data, serialize: ArtistManagerSerializer
    rescue =>e
      raise e
    end
  end


  def validateUserConflit(email, phone)
    @artist_manager_repo = ArtistManagerRepository.new
    existingUserByEmail=@artist_manager_repo.findOneDeletedFalse(:email, email)
    if existingUserByEmail
      raise ErrorHelper::Error.new(409, "Email with that user already exists")
    end

    existingUserByPhone=@artist_manager_repo.findOneDeletedFalse(:phone, phone)

    if existingUserByPhone
      raise ErrorHelper::Error.new(409, "Phone with that user already exists")
    end
  end

  def user_params
    params.require(:artistManager).permit(:first_name, :last_name, :email, :password, :phone, :dob, :gender, :address, :role, :deleted_at)
  end

  def update_user_params
    params.require(:artistManager).permit(:first_name, :last_name, :password, :phone, :gender, :dob, :address)
  end

  protected_action :create, :update, :softDelete, :hardDelete, :restore, :getById, :list
end
