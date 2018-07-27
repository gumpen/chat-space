json.array! @newMessages do |message|
  json.id message.id
  json.user_name message.user.name
  json.created_at message.created_at.to_s
  json.body message.body
  json.image message.image.url
end