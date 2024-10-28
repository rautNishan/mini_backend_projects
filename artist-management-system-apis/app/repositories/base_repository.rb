class BaseRepository
  def initialize(model_class)
        @model_class=model_class
  end

  def list(options: {})
    per_page = options[:per_page].to_i > 0 ? options[:per_page].to_i : 6
    page = options[:page].to_i > 0 ? options[:page].to_i : 1
    join_options = options[:join_options]
    deleted_at = options[:deleted_at] || false
    select_columns = options[:select] || "*"
    search_query = options[:search] || nil
    search_fields = options[:search_fields] || []
    where_search = options[:where] || {}
    sortable_fields=options[:sortable_fields] || [ "created_at" ]
    sort_by=options[:sort_by]  || "created_at"
    puts "Where Search: #{where_search}"

    sort_order = %w[asc desc].include?(options[:sort_order].to_s.downcase) ? options[:sort_order].to_s.downcase : "asc"


    query = @model_class.all

    if deleted_at.to_s == "true" || deleted_at==true
      total_count = @model_class.count
    else
      query = query.where(deleted_at: nil)
      total_count = @model_class.where(deleted_at: nil).count
    end

    query = query.joins(join_options) if join_options

    query = query.select(select_columns) if select_columns

    if search_query.present? && search_fields.any?
      search_conditions = search_fields.map { |field| "#{field} ILIKE :search_query" }.join(" OR ")
      query = query.where(search_conditions, search_query: "%#{search_query}%")
      total_count = @model_class.where(search_conditions, search_query: "%#{search_query}%").count
    end

    if where_search.any?
      query = query.where(where_search)
      total_count = @model_class.where(where_search).count
      puts "This is Where Search: #{query.inspect}"
    end

    if sort_by.present? && sortable_fields.include?(sort_by)
      query = query.order("#{sort_by} #{sort_order}")
    else
      query=query.order("#{sort_by} #{sort_order}")
    end


    total_pages = (total_count.to_f / per_page).ceil

    offset = (page - 1) * per_page
    query = query.limit(per_page).offset(offset)

     {
      pagination: {
        total: total_count,
        current_page: page,
        next_page: page < total_pages ? page + 1 : nil,
        prev_page: page > 1 ? page - 1 : nil,
        total_pages: total_pages,
        per_page: per_page
      },
      data: query
    }
  end

  def listOnlyDeleted(options: {})
    per_page = options[:per_page].to_i > 0 ? options[:per_page].to_i : 6
    page = options[:page].to_i > 0 ? options[:page].to_i : 1
    join_options = options[:join_options]
    select_columns = options[:select] || "*"
    search_query = options[:search] || nil
    search_fields = options[:search_fields] || []
    where_search = options[:where] || {}
    sortable_fields=options[:sortable_fields] || [ "created_at" ]
    sort_by=options[:sort_by]  || "created_at"
    puts "Where Search: #{where_search}"

    sort_order = %w[asc desc].include?(options[:sort_order].to_s.downcase) ? options[:sort_order].to_s.downcase : "asc"


    query = @model_class.all


    query = query.where.not(deleted_at: nil)
    total_count = query.count

    query = query.joins(join_options) if join_options

    query = query.select(select_columns) if select_columns

    if search_query.present? && search_fields.any?
      search_conditions = search_fields.map { |field| "#{field} ILIKE :search_query" }.join(" OR ")
      query = query.where(search_conditions, search_query: "%#{search_query}%")
      total_count = @model_class.where(search_conditions, search_query: "%#{search_query}%").count
    end

    if where_search.any?
      query = query.where(where_search)
      total_count = @model_class.where(where_search).count
    end

    if sort_by.present? && sortable_fields.include?(sort_by)
      query = query.order("#{sort_by} #{sort_order}")
    else
      query=query.order("#{sort_by} #{sort_order}")
    end


    total_pages = (total_count.to_f / per_page).ceil

    offset = (page - 1) * per_page
    query = query.limit(per_page).offset(offset)
    puts "This is Query: #{query.inspect}"

   {
      pagination: {
        total: total_count,
        current_page: page,
        next_page: page < total_pages ? page + 1 : nil,
        prev_page: page > 1 ? page - 1 : nil,
        total_pages: total_pages,
        per_page: per_page
      },
      data: query
    }
  end

  def create(attributes = {})
    record = @model_class.new(attributes)
    record.save!
    record
  end

  def update(id, attributes)
    record = findById(id)
    record.update!(attributes)
    record
  end

  def findById(id, options: {})
    join_options = options[:join_options]
    deleted_at = options[:deleted_at] || false
    where_search = options[:where] || {}
    select_columns = options[:select] || "*"

    query = @model_class

    query = query.select(select_columns) if select_columns

    if !deleted_at
      query = query.where(deleted_at: nil)
    end



    query = query.joins(join_options) if join_options

    if where_search.any?
      query = query.where(where_search)
    end

    query.find_by(id: id)
  end

  def findOneDeletedFalse(key, value)
    query = @model_class.where(deleted_at: nil)
    query.find_by(key => value)
  end

  def findOneDeletedFalseMultipleConditions(conditions)
      query = @model_class.where(deleted_at: nil)
      conditions.each do |key, value|
        query = query.where(key => value)
      end
      query.first
  end


  def findOneDeletedTrue(key, value)
    query=@model_class
    query.find_by(key => value)
  end

  def softDelete(id)
    existingData=findById(id)
    existingData.update_column(:deleted_at, Time.current)
    existingData
  end

  def hardDelete(id)
    existingData=findById(id)
    existingData.destroy!
  end

  def restore(id)
    existingData=findById(id, options: { deleted_at: true })
    existingData.update_column(:deleted_at, nil)
    existingData
  end

  def updateColumn(id, columnName, value)
    existingData=findById(id)
    existingData.update_column(columnName, value)
    existingData
  end

  def returnRepo
        @model_class
  end

  def transaction(&block)
    @model_class.transaction(&block)
  end
end
