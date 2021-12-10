Rails.application.routes.draw do
	get 'welcome/index'
	post 'welcome/upload'
	resources :posts
	get 'welcome/auth_params'
	root 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
