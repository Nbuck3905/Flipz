class CreateTransaction < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |table|
      table.integer :user_id
      table.integer :listing_id
      table.boolean :completed, default: false
  end
end
end
