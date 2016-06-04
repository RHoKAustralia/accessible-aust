# accessible-aust
rhok project

## Setup instructions
Clone the repo and run ```rake db:setup``` to create the database and load the data from Data.csv into the database

## Executing the application:
Run ```rails server``` to start the server

## Endpoints:

### GET /venues
```GET /venues``` to see all venues in JSON format

### POST /search_venues
```POST /search_venues``` with parameters ```disability_type``` AND ```location```

| Disability types |
| ---------------- |
| m1               |
| m2               |
| hs               |
| h1               |
| v1               |


## Devs

* Joao Medrado
* Benjamin Sweetnam
* Alvin Tolentino

