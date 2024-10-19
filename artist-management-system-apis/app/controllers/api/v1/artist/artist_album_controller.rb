class Api::V1::Artist::ArtistAlbumController < ApplicationController
  include UserProtected
  # List all Super Users with manual pagination
  def list
    @album_repo=AlbumRepository.new
    authenticated_user=get_user
    repo= @album_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "album_name", "total_number_of_music" ], search_fields: [ "album_name" ], search: params[:search], join_options: [], where: { artist_id: authenticated_user[:id] } })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  # Get By Id
  def getById
    begin
    @album_repo=AlbumRepository.new
    authenticated_user=get_user
    album_by_id=@album_repo.findById(params[:id], options: { join_options: [], where: { artist_id: authenticated_user[:id] } })
    if album_by_id.nil?
      raise ErrorHelper::Error.new(404, "Album not found")
    end
    @success_message ="Fetched Album By Id"
    render json: album_by_id, serializer: AlbumSerializer
    rescue => e
      raise e
    end
  end

  # Create new User
  def create
    ActiveRecord::Base.transaction do
      @album_repo=AlbumRepository.new
      authenticated_user=get_user
      updated_params=album_params.merge(artist_id: authenticated_user[:id], deleted_at: nil)
      album = @album_repo.create(updated_params)

      @artist_repo=ArtistRepository.new
      existing_artist=@artist_repo.findById(authenticated_user[:id])
      existing_artist.update_column(:no_of_albums_released, existing_artist[:no_of_albums_released]+1)

      @success_message ="Created Successfully."
      render json: album, serializer: AlbumSerializer
    rescue => e
      raise e
    end
  end

  def update
    begin
      @album_repo = AlbumRepository.new
      @album_repo.transaction do
        existingAlbum=@album_repo.findById(params[:id])
        if !existingAlbum
          raise ErrorHelper::Error.new(404, "Album not found")
        end
        updated_music = @album_repo.update(params[:id], update_album_params)
        @success_message="Updated Successfully."
        render json: updated_music, serializer: AlbumSerializer
      end
    rescue => e
      raise e
    end
  end


  # def softDelete
  #   begin
  #     @album_repo=AlbumRepository.new
  #     existingData=@album_repo.findById(params[:id])
  #     if existingData.nil?
  #       raise ErrorHelper::Error.new(404, "Album not found")
  #     end
  #     deleted_data=@album_repo.softDelete(params[:id])
  #     @success_message ="Deleted Successfully."
  #     render json: deleted_data, serialize: AlbumSerializer
  #   rescue =>e
  #     raise e
  #   end
  # end

  def hardDelete
    begin
        @album_repo=AlbumRepository.new
        @album_repo.transaction do
          existingData=@album_repo.findById(params[:id])
          if existingData.nil?
            raise ErrorHelper::Error.new(404, "Album not found")
          end
          deleted_data=@album_repo.hardDelete(params[:id])
          # Decrement the counts
          authenticated_user=get_user
          @artist_repo=ArtistRepository.new
          existing_artist=@artist_repo.findById(authenticated_user[:id])
          existing_album_counts=existing_artist[:no_of_albums_released]
          if existing_album_counts>0
            existing_artist.update_column(:no_of_albums_released, existing_artist[:no_of_albums_released]-1)
          end

          @success_message="Deleted Successfully."
          render json: { id: deleted_data[:id] }
      end
    rescue => e
      raise e
    end
  end

  # def restore
  #   begin
  #     @album_repo=AlbumRepository.new
  #     existingData=@album_repo.findById(params[:id], options: { deleted_at: "true" })
  #     if existingData.nil?
  #       raise ErrorHelper::Error.new(404, "Music not found")
  #     end
  #     deleted_data=@album_repo.restore(params[:id])
  #     @success_message ="Restored Successfully."
  #     render json: deleted_data, serialize: AlbumSerializer
  #   rescue =>e
  #     raise e
  #   end
  # end


  def album_params
    params.require(:album).permit(:album_name, :deleted_at)
  end

  def update_album_params
    params.require(:album).permit(:album_name)
  end

  protected_action :create, :update, :hardDelete, :getById, :list
end
