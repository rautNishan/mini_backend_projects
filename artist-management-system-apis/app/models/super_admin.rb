class SuperAdmin < ApplicationRecord
  include RoleEnum
  include GenderEnum

  enum role: RoleEnum::ROLES
  enum gender: GenderEnum::GENDERS

  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: false, length: { maximum: 255 }
  validates :email, presence: true, length: { maximum: 255 }
  has_secure_password
  validates :password, presence: true, on: :create
  validates :phone, presence: true, length: { maximum: 20 }
  validates :dob, presence: true
end
