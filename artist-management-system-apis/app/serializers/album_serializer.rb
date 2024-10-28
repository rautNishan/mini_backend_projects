class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :album_name, :total_number_of_music

  # def music
  #   ActiveModelSerializers::SerializableResource.new(object.music, each_serializer: MusicSerializer)
  # end
end
