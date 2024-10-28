class Api::V1::Admin::AdminSuperUserDashController < ApplicationController
  include UserProtected

  def superUserStats
    @super_admin_repo=SuperAdminRepository.new
    stats=@super_admin_repo.returnRepo
    notDeletedCount=stats.where(deleted_at: nil).count
    deletedCount=stats.where.not(deleted_at: nil).count
    total_count=stats.all.count
    render json: { notDeletedCount: notDeletedCount, deletedCount: deletedCount, total_count: total_count }
  end

  def artistStats
    @artist_repo=ArtistRepository.new
    stats=@artist_repo.returnRepo
    notDeletedCount=stats.where(deleted_at: nil).count
    deletedCount=stats.where.not(deleted_at: nil).count
    total_count=stats.all.count
    render json: { notDeletedCount: notDeletedCount, deletedCount: deletedCount, total_count: total_count }
  end

  def artistManagerStats
    @artist_manager_repo=ArtistManagerRepository.new
    stats=@artist_manager_repo.returnRepo
    notDeletedCount=stats.where(deleted_at: nil).count
    deletedCount=stats.where.not(deleted_at: nil).count
    total_count=stats.all.count
    render json: { notDeletedCount: notDeletedCount, deletedCount: deletedCount, total_count: total_count }
  end

  def songsGenraStats
    @musicRepo=MusicRepository.new
    stats=@musicRepo.returnRepo
    rock_count=stats.where(genre: GenreEnum::GENRES[:rock]).count
    rnb_count = stats.where(genre:  GenreEnum::GENRES[:rnb]).count
    country_count = stats.where(genre:  GenreEnum::GENRES[:country]).count
    classic_count = stats.where(genre: GenreEnum::GENRES[:classic]).count
    jazz_count = stats.where(genre: GenreEnum::GENRES[:jazz]).count
    total_songs=stats.all.count
    render json: { rock_count: rock_count, country_count: country_count, rnb_count: rnb_count, classic_count: classic_count, jazz_count: jazz_count, total_songs: total_songs }
  end

  protected_action :superUserStats, :artistStats, :artistManagerStats, :songsGenraStats
end
