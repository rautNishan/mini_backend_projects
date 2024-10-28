# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_25_092953) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.string "album_name", limit: 500, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_number_of_music", default: 0, null: false
    t.index ["album_name"], name: "index_albums_on_album_name"
    t.index ["artist_id"], name: "index_albums_on_artist_id"
  end

  create_table "artist_managers", force: :cascade do |t|
    t.string "first_name", limit: 255
    t.string "last_name", limit: 255
    t.string "email", limit: 255, null: false
    t.string "password_digest", limit: 500, null: false
    t.string "phone", limit: 20, null: false
    t.datetime "dob"
    t.integer "gender"
    t.string "address"
    t.datetime "deleted_at"
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_artist_managers_on_email", unique: true
    t.index ["phone"], name: "index_artist_managers_on_phone", unique: true
  end

  create_table "artists", force: :cascade do |t|
    t.string "name", limit: 255, null: false
    t.datetime "dob"
    t.integer "gender"
    t.string "address"
    t.integer "first_release_year"
    t.integer "no_of_albums_released", default: 0
    t.datetime "deleted_at"
    t.integer "role", null: false
    t.string "email", limit: 255, null: false
    t.string "password_digest", limit: 500, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_artists_on_email", unique: true
  end

  create_table "musics", force: :cascade do |t|
    t.string "title", limit: 255, null: false
    t.bigint "album_id", null: false
    t.integer "genre", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_musics_on_album_id"
    t.index ["genre"], name: "index_musics_on_genre"
    t.index ["title"], name: "index_musics_on_title"
  end

  create_table "super_admins", force: :cascade do |t|
    t.string "first_name", limit: 255
    t.string "last_name", limit: 255
    t.string "email", limit: 255, null: false
    t.string "password_digest", limit: 500, null: false
    t.string "phone", limit: 20, null: false
    t.datetime "dob"
    t.integer "gender"
    t.string "address"
    t.datetime "deleted_at"
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_super_admins_on_email", unique: true
    t.index ["phone"], name: "index_super_admins_on_phone", unique: true
  end

  add_foreign_key "albums", "artists"
  add_foreign_key "musics", "albums"
end
