FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/fixtures/img/sample.jpg")
    user
    group
  end
end
