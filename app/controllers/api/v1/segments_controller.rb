class Api::V1::SegmentsController < ApplicationController
  def create
    segment = Segment.find_or_create_by(segment_params)
    render json: segment
  end

  private

  def segment_params
    params.require(:segment).permit!
  end
end