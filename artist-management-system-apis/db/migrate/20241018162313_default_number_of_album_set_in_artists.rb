class DefaultNumberOfAlbumSetInArtists < ActiveRecord::Migration[7.2]
  def change
    change_column_default :artists, :no_of_albums_released, 0
  end
end
