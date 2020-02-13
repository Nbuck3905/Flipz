class UsersController < ApplicationController

    def get_logged_in
        render json: current_user
    end

    def create
        @user = User.new
        @user.password = params[:password]
        @user.username = params[:username]

        if  User.find_by({username: params[:username]})
                render json:{ 
                    error: true, 
                    message: "Username already exists" 
                }
        else 
            @user.save
            render json: @user
        end
    end

    def auth
        @user = User.find_by({username: params[:username]})
        puts @user
            if @user != nil
                if @user.authenticate(params[:password])
                    puts "Log in was succesful"
                    session[:user_id] = @user.id
                    puts session
                    render json: @user
                else
                    puts "Wrong password"
                    render json:{
                        error: true,
                        message: "Username/password combination invalid."
                    }
                end  
            else
                puts "Invalid username"
                    render json:{
                        error: true,
                        message: "Username/password combination invalid."
                    }
        end
    end     
    
    def logout
        session[:user_id] = nil
    end
end