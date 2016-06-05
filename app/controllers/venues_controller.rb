class VenuesController < ApplicationController
  def index
    render json: Venue.all
  end

  def show
    @venues = []
    ['1', '2', '3', '4'].each do |id|
    @venues.push Venue.find(id)
    end

    # render json: Venue.find(params[:id])
  end
end
