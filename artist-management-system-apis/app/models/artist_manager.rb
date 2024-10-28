class ArtistManager < ApplicationRecord
  include RoleEnum
  include GenderEnum

  enum role: RoleEnum::ROLES
  enum gender: GenderEnum::GENDERS

  validates :first_name, presence: true, length: { minimum: 3, maximum: 255 }, format: { with: /\A[a-zA-Z ]+\z/,
  message: "only allows letters" }
  validates :last_name, presence: false, length: { minimum: 1, maximum: 255 }, format: { with: /\A[a-zA-Z ]+\z/,
  message: "only allows letters" }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  has_secure_password
  validates :password, presence: true, length: { minimum: 8, maximum: 255 }, on: :create
  validates :password, length: { minimum: 8, maximum: 255 }, if: -> { password.present? }
  validates :phone, presence: true, length: { minimum: 10, maximum: 10 }, format: { with: /\A\d{10}\z/, message: "Must be only numbers" }
  validates :dob, presence: true
  validate :dob_cannot_be_in_the_future


  private

  def dob_cannot_be_in_the_future
    if dob.present? && dob > Date.today
      errors.add(:dob, "can't be in the future")
    end
  end
end
