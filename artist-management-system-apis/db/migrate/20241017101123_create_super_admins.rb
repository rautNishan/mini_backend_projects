class CreateSuperAdmins < ActiveRecord::Migration[7.2]
  def change
    create_table :super_admins do |t|
      t.string :first_name, limit: 255
      t.string :last_name, limit: 255, null: true
      t.string :email, limit: 255, null: false
      t.string :password_digest, limit: 500, null: false
      t.string :phone, limit: 20, null: false
      t.datetime :dob, null: true
      t.integer :gender, null: true
      t.string :address, null: true
      t.datetime :deleted_at, null: true
      t.integer :role, null: false

      t.timestamps
    end

    add_index :super_admins, :email, unique: true
    add_index :super_admins, :phone, unique: true
  end
end
