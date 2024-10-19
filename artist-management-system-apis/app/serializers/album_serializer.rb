class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :album_name, :music

  def music
    ActiveModelSerializers::SerializableResource.new(object.music, each_serializer: MusicSerializer)
  end
end
