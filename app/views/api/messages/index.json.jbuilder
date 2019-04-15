json.array! @messages do |message|
  json.message message.message
  json.image message.image
  json.date message.created_at.in_time_zone('Asia/Tokyo').strftime("%Y/%m/%d(%a) %H:%M")
  json.user_name message.user.name
  json.id message.id
end
