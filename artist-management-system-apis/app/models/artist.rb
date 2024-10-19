class Artist < ApplicationRecord
  include RoleEnum
  include GenderEnum

  enum role: RoleEnum::ROLES
  enum gender: GenderEnum::GENDERS

  has_many :albums

  validates :name, presence: true, length: { minimum: 1, maximum: 255 }
  validates :email, presence: true, length: { minimum: 1, maximum: 255 }
  validates :password, presence: true, on: :create
  validates :dob, presence: true
  validates :first_release_year, numericality: { only_integer: true, greater_than_or_equal_to: 1900, less_than_or_equal_to: ->(_artist) { Date.current.year } }
  has_secure_password
end
