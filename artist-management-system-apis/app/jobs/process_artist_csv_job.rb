require "csv"

class ProcessArtistCsvJob < ApplicationJob
  queue_as :default

  def perform(file_path)
    puts "This is File_Path: #{file_path}"
    artist_repo = ArtistRepository.new
    errors = []

    CSV.foreach(file_path, headers: true).with_index(1) do |row, index|
      artist_params = {
        name: row["name"],
        email: row["email"],
        password: row["password"],
        dob: row["dob"],
        gender: row["gender"],
        address: row["address"],
        first_release_year: row["first_release_year"],
        role: Artist.roles[:artist],
        deleted_at: nil
      }

      begin
        validate_user_conflict(artist_repo, artist_params[:email])

        gender_value = GenderEnum::GENDERS[artist_params[:gender].to_s.downcase.to_sym] if artist_params[:gender].present?
        artist_params[:gender] = gender_value

        artist_repo.create(artist_params)
      rescue => e
        errors << { row: index, error: e }
      end
    end

    if errors.any?
      puts "########### There are Errors, Check Logs of csv Errors. ########### "
      File.open("#{Rails.root}/log/artist_csv_errors.log", "a") do |f|
        f.puts "Errors encountered while processing CSV file at #{Time.now}:"
        errors.each do |error|
          f.puts "Row #{error[:row]}: #{error[:error]}"
        end
      end
    end
  end

  private

  def validate_user_conflict(artist_repo, email)
    existing_user_by_email = artist_repo.findOneDeletedFalse(:email, email)
    raise ErrorHelper::Error.new(409, "Email already exists") if existing_user_by_email
  end
end
