class ProductsController < ApplicationController


    def display
        render json: Product.all
    end


end