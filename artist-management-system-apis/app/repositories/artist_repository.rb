class ArtistRepository < BaseRepository
  def initialize
      super(Artist)
  end

  def find_in_batches(batch_size: 1000, conditions: {})
    @model_class.where(conditions).find_each(batch_size: batch_size) do |artist|
      yield artist
    end
  rescue => e
    puts "Error during batch processing: #{e.message}"
    raise e
  end
end
