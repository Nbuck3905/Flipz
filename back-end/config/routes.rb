Rails.application.routes.draw do

  post '/users', to: 'users#create'

  post "/login", to: "users#auth"

  get "/products", to: "products#display"

  get '/user', to: 'users#get_logged_in'

  post '/logout', to: 'users#logout'

  get '/listings_for_product/:product_id', to: 'listings#listings_for_product'

  get '/transactions/:listing_id', to: 'transactions#create'

  get '/check_out', to: 'transactions#check_out'

  get '/view_cart', to: 'transactions#view_cart'

  get '/transactions/delete/:transaction_id', to: 'transactions#delete'

end
