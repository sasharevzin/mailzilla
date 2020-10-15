class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)

  belongs_to :user
  has_many :campaign_contacts
  belongs_to :segment

  def as_json(_options = nil)
    sent = campaign_contacts.length
    delivered = campaign_contacts.where("(status = 'delivered') or (status='open')").length
    open = campaign_contacts.where(status: "open").length
    open_rate = open / delivered.to_f

    {
      id: id,
      name: name,
      status: status,
      created_at: created_at,
      subject: subject,
      from: from,
      content: content,
      segment: segment,
      num_of_contacts: segment.contacts.length,
      template_id: template_id,
      user: user,
      sent: sent,
      delivered: delivered,
      open: open,
      open_rate: open_rate.round(2)
    }
  end

  def send_test
    fromAddress = SendGrid::Email.new(email: from)
    body = SendGrid::Content.new(type: "text/html", value: content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    to = SendGrid::Email.new(email: user.email)
    mail = SendGrid::Mail.new(fromAddress, subject, to, body)
    sg.client.mail._("send").post(request_body: mail.to_json)
  end

  def send_to_segment
    fromAddress = SendGrid::Email.new(email: from)
    body = SendGrid::Content.new(type: "text/html", value: content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])

    segment.contacts.each { |contact|
      campaign_contact = campaign_contacts.create(contact: contact)
      to = SendGrid::Email.new(email: contact.email)
      mail = SendGrid::Mail.new(fromAddress, subject, to, body)
      mail.add_custom_arg(SendGrid::CustomArg.new(key: 'campaign_contact_id', value: campaign_contact.id))
      sg.client.mail._("send").post(request_body: mail.to_json)
    }

    update(status: :sent)
  end
end
