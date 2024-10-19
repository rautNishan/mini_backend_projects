class Album < ApplicationRecord
  belongs_to :artist

  has_many :music, dependent: :destroy
  validates :album_name, presence: true, length: { minimum: 1, maximum: 500 }
end
