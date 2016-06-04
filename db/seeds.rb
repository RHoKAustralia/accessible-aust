# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
require 'csv'

venues_csv = CSV.open('Data.csv', headers: true, encoding:'iso-8859-1:utf-8')

# venues_csv.rewind;
venues_csv.each do |d| 
  puts(Venue.new({
    url: d['URL'],
    state: d['STATE'],
    category: d['CATEGORY'],
    name: d['Name of venue/attraction'],
    location: d['Location'],
    phone: d['PHONE'],
    website: d['WEBSITE'],
    email: d['EMAIL'],
    m1: d['M1'],
    m2: d['M2'],
    hs: d['HS'],
    h1: d['H1'],
    v1: d['V1'],
    other_info: d['OTHERINO'],
    img_url: d['IMG_URL'] }).save )
end

