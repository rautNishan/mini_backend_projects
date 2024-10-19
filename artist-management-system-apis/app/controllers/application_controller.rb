class ApplicationController < ActionController::API
    # Global error handling for StandardError
    rescue_from StandardError, with: :handle_standard_error
    after_action :modify_success_response, if: -> { response.successful? && response.content_type&.include?("application/json") }
    private

    # This method will modify the successful response
    def modify_success_response
      current_date = Time.current.strftime("%Y-%m-%d %H:%M:%S")
      # Only modify JSON responses
      if response.status < 400
        # Get the original response body
        original_body = JSON.parse(response.body) rescue response.body

        message = instance_variable_get(:@success_message) || "Request was successful"

        # Modify the response structure
        modified_body = {
          date: current_date,
          message: message,
          statusCode: response.status,
          data: original_body
        }

        # Set the modified body as the response
        response.body = modified_body.to_json
      else
        puts "NO"
      end
    end


    private

    def handle_standard_error(exception)
      internal_server_error = 500
      current_date = Time.current.strftime("%Y-%m-%d %H:%M:%S")
      if exception.is_a?(::ErrorHelper::Error)
        Rails.logger.error "Helper error: #{exception.class} - #{exception.error_message}"
        render json: { date: current_date, statusCode: exception.status_code, message: exception.error_message }, status: exception.status_code
      elsif exception.is_a?(ActiveRecord::ActiveRecordError)
        Rails.logger.error "ActiveRecord error: #{exception.class} - #{exception.message}"
        render json: { date: current_date, statusCode: internal_server_error, message: exception.message }, status: internal_server_error
      else
        Rails.logger.error "An unexpected error occurred: #{exception.class} - #{exception.message}"
        render json: { date: current_date, statusCode: internal_server_error, error: exception.message  }, status: internal_server_error
      end
    end
end
