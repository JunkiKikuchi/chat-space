class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.message? ? last_message.message : '画像が投稿されています'
    else
      'まだメッセージはありません'
    end
  end

  def show_members
    user_list = []
    users.each do | user |
      user_list << user.name
    end

    user_list.join(", ")
  end
end
