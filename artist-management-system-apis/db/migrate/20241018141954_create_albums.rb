class CreateAlbums < ActiveRecord::Migration[7.2]
  def change
    create_table :albums do |t|
      t.references :artist, null: false, foreign_key: true
      t.string :album_name, null: false, limit: 500
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :albums, :album_name
  end
end
