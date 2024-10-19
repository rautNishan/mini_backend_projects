module ErrorHelper
  class Error < ActiveRecord::ActiveRecordError
    attr_reader :status_code, :error_message

    def initialize(status_code, error_message)
      @status_code = status_code
      @error_message = error_message
      super("#{status_code}: #{error_message}")
    end
  end
end
