# spartans-task

## Overivew

Project consists of 2 main parts:

- Express server which serves the clients
- Database worker script which constantly checks for new orders and processes them

## Installing packages

Just run

> `npm i`

and you should be good to go.

## Setting up database

Database can be set up locally by using provided `Dockerfile`. Commands that you need to run:

> `docker build -t mongo_spartan` .

> `docker run -dp 27017:27017 mongo_spartan`

After that you need to insert ingredients manually. See `ingredients.json` file for more context.

## Setting up .env

See `.env.example` and create `.env` file based on it.

## Running server

After you've set up everything, just run:

`> npm run start`

## Running database worker

After you've set up everything, just run:

`> npm run start-database-worker`
