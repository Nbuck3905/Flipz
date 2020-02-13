class User < ActiveRecord::Base
    has_secure_password
    has_many :listings
    has_many :products, through: :listings
    has_many :transactions

    validates_presence_of :username
    validates_uniqueness_of :username
end 