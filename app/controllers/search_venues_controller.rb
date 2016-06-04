class SearchVenuesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:create]

  def create
    unless params['disability_type'] && params['location']
      fail ArgumentError, 'Missing disability_type AND location'
    end
    disability_condition = disability_search(params['disability_type'])
    search_results = Venue.where(disability_condition).where('location LIKE :location OR state LIKE :location', location: "%#{params['location']}%")
    if params['min_price']
      search_results = search_results.where('price >= ?', params['min_price'])
    end
    if params['max_price']
      search_results = search_results.where('price <= ?', params['max_price'])
    end
    render json: search_results
  end


  def disability_search(disability_type)
    disability_types = ['m1', 'm2', 'hs', 'h1', 'v1']
    unless disability_types.include?(disability_type)
      fail ArgumentError, "Invalid disability_type #{disability_type}"
    end
    {disability_type.to_sym => 'YES'}
  end
end
