class Music < ApplicationRecord
  belongs_to :album

  enum genre: GenreEnum::GENRES

  validates :title, presence: true, length: { minimum: 1, maximum: 255 }
  validates :album_id, presence: true
end
