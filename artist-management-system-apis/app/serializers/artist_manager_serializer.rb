class ArtistManagerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :gender, :dob, :address
end
