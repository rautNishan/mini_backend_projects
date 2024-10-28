class JsonWebToken
  # SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
  SECRET_KEY="hhsdakhdksahdasdhahjkksadhkashaskd"

  def self.encode(payload, exp = 24.hours.from_now)
  payload[:exp] = exp.to_i
  JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    begin
      decoded = JWT.decode(token, SECRET_KEY).first
      HashWithIndifferentAccess.new decoded
    rescue => e
      puts "Class : #{e.class}"
      if e.class == JWT::ExpiredSignature
        raise ErrorHelper::Error.new(440, e)
      else
        raise e
      end
    end
  end
end
