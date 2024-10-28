class Artist < ApplicationRecord
  include RoleEnum
  include GenderEnum

  enum role: RoleEnum::ROLES
  enum gender: GenderEnum::GENDERS

  has_many :albums

  validates :name, presence: true, length: { minimum: 1, maximum: 255 }, format: { with: /\A[a-zA-Z ]+\z/,
  message: "only allows letters" }
  validates :email, presence: true, length: { minimum: 1, maximum: 255 }, format: { with:  /\A[a-z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\z/, message: "must be lowercase and valid" }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 8, maximum: 255 }, on: :create
  validates :password, length: { minimum: 8, maximum: 255 }, if: -> { password.present? }
  validates :dob, presence: true
  validate :dob_cannot_be_in_the_future
  validates :first_release_year, numericality: { only_integer: true, greater_than_or_equal_to: 1900, less_than_or_equal_to: ->(_artist) { Date.current.year } }
  has_secure_password


  private

  def dob_cannot_be_in_the_future
    if dob.present? && dob > Date.today
      errors.add(:dob, "can't be in the future")
    end
  end
end
