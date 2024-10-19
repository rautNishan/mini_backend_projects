class CreateMusics < ActiveRecord::Migration[7.2]
  def change
    create_table :musics do |t|
      t.string :title, null: false, limit: 255
      t.references :album, null: false, foreign_key: true
      t.integer :genre, null: false
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :musics, :title
    add_index :musics, :genre
  end
end
