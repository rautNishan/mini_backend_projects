Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "admin/AdminSuperUserArtistManager"
    end
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # All Routes for Super Admin
      namespace :admin do
        # User Super Admin
        get "super-user/list", to: "admin_super_user#list"
        get "super-user/:id", to: "admin_super_user#getById"
        post "super-user/create", to: "admin_super_user#create"
        patch "super-user/update/:id", to: "admin_super_user#update"
        delete "super-user/soft-delete/:id", to: "admin_super_user#softDelete"
        delete "super-user/hard-delete/:id", to: "admin_super_user#hardDelete"
        patch "super-user/restore/:id", to: "admin_super_user#restore"


        # Auth Super Admin
        get "auth/me", to: "admin_super_user_auth#authMe"
        post "auth/login", to: "admin_super_user_auth#login"

        # Super Admin Artist Manager CRUD
        get "artist-manager/list", to: "admin_super_user_artist_manager#list"
        get "artist-manager/list-deleted", to: "admin_super_user_artist_manager#listDeletedOnly"
        get "artist-manager/:id", to: "admin_super_user_artist_manager#getById"
        post "artist-manager/create", to: "admin_super_user_artist_manager#create"
        patch "artist-manager/update/:id", to: "admin_super_user_artist_manager#update"
        delete "artist-manager/soft-delete/:id", to: "admin_super_user_artist_manager#softDelete"
        delete "artist-manager/hard-delete/:id", to: "admin_super_user_artist_manager#hardDelete"
        patch "artist-manager/restore/:id", to: "admin_super_user_artist_manager#restore"

        # Super Admin Artist Manager CRUD
        get "artist/list", to: "admin_super_user_artist#list"
        get "artist/list-deleted", to: "admin_super_user_artist#listDeletedOnly"
        get "artist/:id", to: "admin_super_user_artist#getById"
        post "artist/create", to: "admin_super_user_artist#create"
        patch "artist/update/:id", to: "admin_super_user_artist#update"
        delete "artist/soft-delete/:id", to: "admin_super_user_artist#softDelete"
        delete "artist/hard-delete/:id", to: "admin_super_user_artist#hardDelete"
        patch "artist/restore/:id", to: "admin_super_user_artist#restore"

        # Super Admin Album Manager
        get "album/list/:id", to: "admin_super_user_album#listAccordingArtist"

        # Super Admin Songs
        get "music/list/:id", to: "admin_super_user_song#listSongsByArtist"

        # Dash
        get "dash/admin-stats", to: "admin_super_user_dash#superUserStats"
        get "dash/artist-stats", to: "admin_super_user_dash#artistStats"
        get "dash/manager-stats", to: "admin_super_user_dash#artistManagerStats"
        get "dash/song-genre-stats", to: "admin_super_user_dash#songsGenraStats"
      end
      # All Routes for Artis
      namespace :artist do
        # Auth Artist
        get "auth/me", to: "artist_auth#authMe"
        get "info/me", to: "artist_auth#infoMe"
        post "auth/login", to: "artist_auth#login"

        # Album List
        get "album/list", to: "artist_album#list"
        get "album/:id", to: "artist_album#getById"
        post "album/create", to: "artist_album#create"
        patch "album/update/:id", to: "artist_album#update"
        delete "album/hard-delete/:id", to: "artist_album#hardDelete"


        # Music List
        get "music/list/:id", to: "artist_music#list"
        get "music/:id", to: "artist_music#getById"
        post "music/create", to: "artist_music#create"
        patch "music/update/:id", to: "artist_music#update"
        delete "music/hard-delete/:id", to: "artist_music#hardDelete"
      end
      # All Routes for Manager
      namespace :manager do
        # Auth Manger
        get "auth/me", to: "artist_manager_auth#authMe"
        post "auth/login", to: "artist_manager_auth#login"
        get "info/me", to: "artist_manager_auth#infoMe"

        # Artist CRUD by ARTIST MANAGER
        get "artist/list", to: "artist_manager_artist#list"
        get "artist/list-deleted", to: "artist_manager_artist#listDeletedOnly"
        get "artist/csv-download", to: "artist_manager_artist#downloadCsv"
        get "artist/:id", to: "artist_manager_artist#getById"
        post "artist/create", to: "artist_manager_artist#create"
        patch "artist/update/:id", to: "artist_manager_artist#update"
        delete "artist/soft-delete/:id", to: "artist_manager_artist#softDelete"
        patch "artist/restore/:id", to: "artist_manager_artist#restore"
        post "artist/csv-create", to: "artist_manager_artist#createByCsv"

        # Album
        get "album/list/:id", to: "artist_manager_album#listAccordingArtist"

        # Songs
        get "music/list/:id", to: "artist_manager_song#listSongsByArtist"
      end
    end
  end
end
