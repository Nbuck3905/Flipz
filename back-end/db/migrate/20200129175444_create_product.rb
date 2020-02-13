class CreateProduct < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |table|
      table.string :name
      table.string :retail
      table.string :releaseDate
      table.integer :pid
      table.string :uuid
      table.string :image
      table.string :urlKey
    end
  end
end
