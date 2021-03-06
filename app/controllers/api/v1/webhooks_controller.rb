class Api::V1::WebhooksController < ApplicationController
  skip_before_action :authorized

  def create
    events = params["_json"]
    events.each do |event|
      next unless event["campaign_contact_id"]
      campaign_contact = CampaignContact.find(event["campaign_contact_id"])
      campaign_contact.update(status: event["event"])

      if event["event"] == "delivered" && campaign_contact.delivered_at == nil
        campaign_contact.update(delivered_at: Time.current)
      elsif event["event"] == "open" && campaign_contact.open_at == nil
        campaign_contact.update(open_at: Time.current)
      elsif event["event"] == "click" && campaign_contact.click_at == nil
        campaign_contact.update(click_at: Time.current)
      end
    end
    head :ok
  end
end
