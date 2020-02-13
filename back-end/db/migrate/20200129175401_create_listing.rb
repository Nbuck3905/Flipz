class CreateListing < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |table|
      table.string :price
      table.integer :user_id
      table.integer :product_id
      table.integer :size
    end
  end
end
