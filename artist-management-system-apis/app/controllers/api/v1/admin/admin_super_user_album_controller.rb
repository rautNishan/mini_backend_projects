class Api::V1::Admin::AdminSuperUserAlbumController < ApplicationController
  include UserProtected
  def listAccordingArtist
    begin
      @album_repo=AlbumRepository.new
      incoming_artist_id=params[:id]
      @artist_repo=ArtistRepository.new
      user_by_id=@artist_repo.findById(incoming_artist_id, options: {})
      if user_by_id.nil?
        raise ErrorHelper::Error.new(404, "User not found")
      end
      repo= @album_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "album_name", "total_number_of_music" ], search_fields: [ "album_name" ], search: params[:search], join_options: [], where: { artist_id: incoming_artist_id } })
      @success_message ="Data Retrived Successfully"
      render json: repo
    rescue => e
      raise e
    end
  end

  protected_action :listAccordingArtist
end
