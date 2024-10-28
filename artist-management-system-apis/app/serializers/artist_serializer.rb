class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :no_of_albums_released, :first_release_year, :gender, :address, :dob
end
