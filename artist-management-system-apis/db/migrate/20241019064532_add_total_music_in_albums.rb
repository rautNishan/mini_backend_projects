class AddTotalMusicInAlbums < ActiveRecord::Migration[7.2]
  def change
    add_column :albums, :total_number_of_music, :integer, default: 0, null: false
  end
end
