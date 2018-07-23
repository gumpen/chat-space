require 'rails_helper'
describe Message do
  describe '#create' do
    context 'can save' do
      it "can save with body" do
        message = build(:message,image:nil)
        expect(message).to be_valid
      end
      it "can save with image" do
        message = build(:message,body:nil)
        expect(message).to be_valid
      end
      it "can save with body and image" do
        message = build(:message)
        expect(message).to be_valid
      end
    end
    context "can't save" do
      it "can't save without body and image" do
        message = build(:message,body:nil,image:nil)
        message.valid?
        expect(message.errors[:body_or_image]).to include('を入力してください')
      end
      it "can't save without group_id" do
        message = build(:message,group_id:nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
      it "can't save without user_id" do
        message = build(:message,user_id:nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end
