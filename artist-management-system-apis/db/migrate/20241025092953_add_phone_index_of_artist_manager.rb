class AddPhoneIndexOfArtistManager < ActiveRecord::Migration[7.2]
  def change
    add_index :artist_managers, :phone, unique: true, name: 'index_artist_managers_on_phone', if_not_exists: true
  end
end
