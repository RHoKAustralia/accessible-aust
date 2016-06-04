class VenuesController < ApplicationController
  def index
    render json: Venue.all
  end
end
