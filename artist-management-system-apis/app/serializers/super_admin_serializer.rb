class SuperAdminSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone
end
