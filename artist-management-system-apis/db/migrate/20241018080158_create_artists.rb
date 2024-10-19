class CreateArtists < ActiveRecord::Migration[7.2]
  def change
    create_table :artists do |t|
      t.string :name, null: false, limit: 255
      t.datetime :dob, null: true
      t.integer :gender, null: true
      t.string :address, null: true
      t.integer :first_release_year, null: true
      t.integer :no_of_albums_released, null: true
      t.datetime :deleted_at
      t.integer :role, null: false
      t.string :email, limit: 255, null: false
      t.string :password_digest, limit: 500, null: false

      t.timestamps
    end
    add_index :artists, :email, unique: true
  end
end
