class Api::V1::Admin::AdminSuperUserController < ApplicationController
  include UserProtected

# List all Super Users with manual pagination
def list
  @super_admin_repo=SuperAdminRepository.new
  repo= @super_admin_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "first_name", "last_name", "email", "phone", "gender" ], search_fields: [ "first_name", "last_name", "email", "phone" ], search: params[:search], join_options: [] })
  @success_message ="Data Retrived Successfully"
  render json: repo
end

  # Get By Id
  def getById
    begin
    @super_admin_repo=SuperAdminRepository.new
    user_by_id=@super_admin_repo.findById(params[:id], options: {})
    if user_by_id.nil?
      raise ErrorHelper::Error.new(404, "User not found")
    end
    @success_message ="Fetched User By Id"
    render json: user_by_id, serializer: SuperAdminSerializer
    rescue => e
      raise e
    end
  end

  # Create new User
  def create
    begin
      validateUserConflit(user_params[:email], user_params[:phone])
      gender_value = GenderEnum::GENDERS[user_params[:gender].to_s.downcase.to_sym] if user_params[:gender].present?
      updated_params = user_params.merge(role: SuperAdmin.roles[:superAdmin], deleted_at: nil, gender: gender_value)
      @super_admin_repo = SuperAdminRepository.new
      user = @super_admin_repo.create(updated_params)
      @success_message ="Created Successfully."
      render json: user, serializer: SuperAdminSerializer
    rescue => e
      # Handle any errors and log them
      raise e
    end
  end

  def update
    begin
      @super_admin_repo = SuperAdminRepository.new
      existingUser=@super_admin_repo.findById(params[:id])
      if !existingUser
        raise ErrorHelper::Error.new(404, "User not found")
      end
      updated_user = @super_admin_repo.update(params[:id], update_user_params)
      @success_message="Updated Successfully."
      render json: updated_user, serializer: SuperAdminSerializer
    rescue => e
      raise e
    end
  end


  def softDelete
    begin
      @super_admin_repo=SuperAdminRepository.new
      existingData=@super_admin_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@super_admin_repo.softDelete(params[:id])
      @success_message ="Super Admin Deleted Successfully."
      render json: deleted_data, serialize: SuperAdminSerializer
    rescue =>e
      raise e
    end
  end

  def hardDelete
    begin
      @super_admin_repo=SuperAdminRepository.new
      existingData=@super_admin_repo.findById(params[:id])
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@super_admin_repo.hardDelete(params[:id])
      @success_message="Super Admin Deleted Successfully."
      render json: { data: deleted_data[:id] }
    rescue => e
      raise e
    end
  end

  def restore
    begin
      @super_admin_repo=SuperAdminRepository.new
      existingData=@super_admin_repo.findById(params[:id], options: { deleted_at: "true" })
      if existingData.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      deleted_data=@super_admin_repo.restore(params[:id])
      @success_message ="Super Admin Restored Successfully."
      render json: deleted_data, serialize: SuperAdminSerializer
    rescue =>e
      raise e
    end
  end


  def validateUserConflit(email, phone)
    @super_admin_repo = SuperAdminRepository.new
    existingUserByEmail=@super_admin_repo.findOneDeletedFalse(:email, email)
    if existingUserByEmail
      raise ErrorHelper::Error.new(409, "Email with that user already exists")
    end

    existingUserByPhone=@super_admin_repo.findOneDeletedFalse(:phone, phone)

    if existingUserByPhone
      raise ErrorHelper::Error.new(409, "Phone with that user already exists")
    end
  end

  def user_params
    params.require(:superAdmin).permit(:first_name, :last_name, :email, :password, :phone, :dob, :gender, :address, :role, :deleted_at)
  end

  def update_user_params
    params.require(:superAdmin).permit(:first_name, :last_name, :password, :phone, :gender, :dob, :address)
  end

  protected_action :create, :update, :softDelete, :hardDelete, :restore, :getById, :list
end
