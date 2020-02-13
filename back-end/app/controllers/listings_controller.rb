class ListingsController < ApplicationController
    def listings_for_product
        product = Product.find(params[:product_id])
        @listings = product.listings
        render json: @listings 
    end
end