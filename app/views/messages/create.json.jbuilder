json.user_name @message.user.name
json.date @message.created_at.in_time_zone('Asia/Tokyo').strftime("%Y/%m/%d(%a) %H:%M")
json.(@message, :message, :image)
json.id @message.id
