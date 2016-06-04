# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160604064958) do

  create_table "venues", force: :cascade do |t|
    t.string   "url"
    t.string   "state"
    t.string   "category"
    t.string   "name"
    t.string   "location"
    t.string   "phone"
    t.string   "website"
    t.string   "email"
    t.string   "m1"
    t.string   "m2"
    t.string   "hs"
    t.string   "h1"
    t.string   "v1"
    t.string   "other_info"
    t.string   "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "price"
  end

end
