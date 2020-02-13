class Listing < ActiveRecord::Base
belongs_to :user
belongs_to :product
has_many :transactions
end 