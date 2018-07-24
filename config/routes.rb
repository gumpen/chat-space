Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update,:index]
  resources :groups do
    resources :messages
  end
end
