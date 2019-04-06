FactoryBot.define do
  factory :message do
    message {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/favicon.ico")}
    user
    group
  end
end
