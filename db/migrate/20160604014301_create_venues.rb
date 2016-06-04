class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :url
      t.string :state
      t.string :category
      t.string :name
      t.string :location
      t.string :phone
      t.string :website
      t.string :email
      t.string :m1
      t.string :m2
      t.string :hs
      t.string :h1
      t.string :v1
      t.string :other_info
      t.string :img_url

      t.timestamps null: false
    end
  end
end
