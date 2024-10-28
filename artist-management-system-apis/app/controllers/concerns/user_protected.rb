module UserProtected
  def self.included(base)
    base.extend ClassMethods
    base.include InstanceMethods  # Include instance methods
  end

  module ClassMethods
    def protected_action(*actions)
      actions.each do |action|
        original_method = instance_method(action)

        define_method(action) do |*args|
          token = request.headers["Authorization"]
          puts "This is Token : #{token}"
          if !token
            raise ErrorHelper::Error.new(403, "Access denied: Please Login")
          end
          token=token.split(" ")[1]
          role = decode_token(token)
          requested_path=request.path.split("/")[3]
          if (role == "superAdmin" && requested_path == "admin") ||
            (role == "artist" && requested_path == "artist") ||
            (role == "artistManager" && requested_path == "manager")
           original_method.bind(self).call(*args)
          else
           raise ErrorHelper::Error.new(403, "Access denied: You do not have permission to access this resource.")
          end
        end
      end
    end
  end

  module InstanceMethods  # Define instance methods
    attr_reader :current_user
    def decode_token(token)
      begin
        decoded_payload = JsonWebToken.decode(token)
        @current_user = decoded_payload
        role=decoded_payload[:role]
        role
      rescue => e
        raise e
      end
    end

    def get_user
      @current_user
    end
  end
end
