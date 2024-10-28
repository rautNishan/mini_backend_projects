class Api::V1::Artist::ArtistMusicController < ApplicationController
  include UserProtected
  # List all Super Users with manual pagination
  def list
    @music_repo=MusicRepository.new
    @album_repo=AlbumRepository.new
    authenticated_user=get_user
    existing_album=@album_repo.findOneDeletedFalseMultipleConditions(id: params[:id], artist_id: [ authenticated_user[:id] ])
    if existing_album.nil?
      raise ErrorHelper::Error.new(404, "Album Not Found")
    end
    repo= @music_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "title",  "genre" ], search_fields: [ "title" ], search: params[:search], join_options: [], where: { album_id: existing_album[:id] }, sort_order: params[:sortOrder], sortable_fields: [ "id", "title" ], sort_by: params[:sortBy] })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  # Get By Id
  def getById
    begin
    @music_repo=MusicRepository.new
    authenticated_user=get_user
    music_by_id=@music_repo.findById(params[:id], options: {})
    if music_by_id.nil?
      raise ErrorHelper::Error.new(404, "Music not found")
    end
    @album_repo=AlbumRepository.new
    existing_album_by_music=@album_repo.findOneDeletedFalseMultipleConditions(id: music_by_id[:album_id], artist_id: authenticated_user[:id])
    if existing_album_by_music.nil?
      raise ErrorHelper::Error.new(404, "Music not found")
    end
    @success_message ="Fetched Music By Id"
    render json: music_by_id, serializer: MusicSerializer
    rescue => e
      raise e
    end
  end

  # Create new User
  def create
    begin
      @music_repo=MusicRepository.new
      @music_repo.transaction do
        @album_repo=AlbumRepository.new
        auth_user=get_user
        existing_album=@album_repo.findOneDeletedFalseMultipleConditions(id: music_params[:album_id], artist_id: auth_user[:id])
        if existing_album.nil?
          raise ErrorHelper::Error.new(404, "Album not found")
        end
        genre_value = GenreEnum::GENRES[music_params[:genre].to_s.downcase.to_sym]

        if genre_value.nil?
          raise ErrorHelper::Error.new(400, "Invalid genre. Allowed genres are: #{GenreEnum::GENRES.keys.join(', ')}")
        end

        updated_params=music_params.merge(album_id: music_params[:album_id], deleted_at: nil)
        music = @music_repo.create(updated_params)

        # Increment total number of music in album
        existing_album.update_column(:total_number_of_music, existing_album[:total_number_of_music]+1)
        @success_message ="Created Successfully."
        render json: music, serializer: MusicSerializer
      end
    rescue => e
      raise e
    end
  end

  def update
    begin
      @music_repo = MusicRepository.new
      @music_repo.transaction do
        existingMusic=@music_repo.findById(params[:id])

        if !existingMusic
          raise ErrorHelper::Error.new(404, "Music not found")
        end

        if music_params[:genre].present?
          genre_value = GenreEnum::GENRES[music_params[:genre].to_s.downcase.to_sym]
          if genre_value.nil?
            raise ErrorHelper::Error.new(400, "Invalid genre. Allowed genres are: #{GenreEnum::GENRES.keys.join(', ')}")
          end
        end

        updated_music = @music_repo.update(params[:id], update_music_params)
        @success_message="Updated Successfully."
        render json: updated_music, serializer: MusicSerializer
      end
    rescue => e
      raise e
    end
  end


  # def softDelete
  #   begin
  #     @music_repo=MusicRepository.new
  #     existingData=@music_repo.findById(params[:id])
  #     if existingData.nil?
  #       raise ErrorHelper::Error.new(404, "Music not found")
  #     end
  #     deleted_data=@music_repo.softDelete(params[:id])
  #     @success_message ="Deleted Successfully."
  #     render json: deleted_data, serialize: MusicSerializer
  #   rescue =>e
  #     raise e
  #   end
  # end

  def hardDelete
    begin
      @music_repo=MusicRepository.new
      @music_repo.transaction do
        existingData=@music_repo.findById(params[:id])
        if existingData.nil?
          raise ErrorHelper::Error.new(404, "Music not found")
        end

        @album_repo=AlbumRepository.new
        existing_album=@album_repo.findById(existingData[:album_id])

        if existing_album.nil?
          raise ErrorHelper::Error.new(404, "Album not found")
        end
        existing_music_counts=existing_album[:total_number_of_music]
        if existing_music_counts>0
          existing_album.update_column(:total_number_of_music, existing_album[:total_number_of_music]-1)
        end

        deleted_data=@music_repo.hardDelete(params[:id])
        @success_message="Deleted Successfully."
        render json: { data: deleted_data[:id] }
      end
    rescue => e
      raise e
    end
  end

  # def restore
  #   begin
  #     @music_repo=MusicRepository.new
  #     existingData=@music_repo.findById(params[:id], options: { deleted_at: "true" })
  #     if existingData.nil?
  #       raise ErrorHelper::Error.new(404, "Music not found")
  #     end
  #     deleted_data=@music_repo.restore(params[:id])
  #     @success_message ="Restored Successfully."
  #     render json: deleted_data, serialize: MusicSerializer
  #   rescue =>e
  #     raise e
  #   end
  # end


  def music_params
    params.require(:music).permit(:title, :album_id, :genre, :deleted_at)
  end

  def update_music_params
    params.require(:music).permit(:title, :genre)
  end

  protected_action :create, :update, :hardDelete, :getById, :list
end
