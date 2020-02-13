class TransactionsController < ApplicationController

    def create
        transaction = Transaction.new
        transaction.user_id = current_user.id
        transaction.listing_id = params[:listing_id]
        transaction.save
    end

    def view_cart
        @user = current_user
        @cart = @user.transactions.select {|transaction| transaction.completed === false}
        @response = []
        @cart.each do |item|
            item_json = {}
            item_json['listing'] = item.listing
            item_json['product'] = item.listing.product
            item_json['transaction'] = item
            @response.push(item_json)
        end
        render json: @response
    end

    def check_out
        @user = current_user
        @cart = @user.transactions.select {|transaction| transaction.completed === false}
        @cart.each do |transaction|
            transaction.completed = true
            transaction.save
        end
    end

    def delete
        @transaction = Transaction.find(params[:transaction_id])
        @transaction.destroy
    end

end 