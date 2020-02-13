class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |table|
      table.string :username
      table.string :password_digest
    end
  end
end
