class Api::V1::Admin::AdminSuperUserSongController < ApplicationController
  include UserProtected
  # List all Super Users with manual pagination
  def listSongsByArtist
    @music_repo=MusicRepository.new
    @album_repo=AlbumRepository.new
    album_id=params[:id]
    existing_album=@album_repo.findById(album_id)
    if existing_album.nil?
      raise ErrorHelper::Error.new(404, "Album not found")
    end
    repo= @music_repo.list(options: { page: params[:page], per_page: params[:per_page], deleted_at: params[:deleted_at], select: [ "id", "title", "genre" ], search_fields: [ "title"  ], search: params[:search], join_options: [], where: { album_id: album_id }, sort_order: params[:sortOrder], sortable_fields: [ "id", "title" ], sort_by: params[:sortBy] })
    @success_message ="Data Retrived Successfully"
    render json: repo
  end

  protected_action :listSongsByArtist
end
