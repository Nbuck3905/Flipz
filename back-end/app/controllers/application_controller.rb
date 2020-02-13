class ApplicationController < ActionController::API

    def current_user
        puts session
        puts "User id: "
        puts session[:user_id]
        if(session[:user_id])
            User.find(session[:user_id])
        else
            nil
        end
        
    end

end
