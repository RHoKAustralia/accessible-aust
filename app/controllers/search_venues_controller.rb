class SearchVenuesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:create]

  def create
    disability_condition = disability_search(params['disability_type'])
    render json: Venue.where(disability_condition).where('location LIKE :location OR state LIKE :location', location: "%#{params['location']}%")
  end

  def disability_search(disability_type)
    disability_types = ['m1', 'm2', 'hs', 'h1', 'v1']
    unless disability_types.include?(disability_type)
      fail ArgumentError, "Invalid disability_type #{disability_type}"
    end
    {disability_type.to_sym => 'YES'}
  end
end
