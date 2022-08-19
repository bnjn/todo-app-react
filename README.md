# todo-app-react

Written with MERN.

## Dev env
- Spin up a MongoDB server and create a db for the app.
- Create `srv/.env` with the text:

`MONGODB_URL="<DBURLHERE>"`

`DB_NAME="<DBNAMEHERE>"`

`PORT="1337"`

`CORS_ORIGIN="*"`

`SSL_KEY="<SSLKEYHERE>"`

`SSL_CERT="<SSLCERTHERE>"`

(fill in your DB and SSL info)


- `npm run dev` in `./srv` to start back end.
- `npm start` in `./` to start front end.
- Cors issues can be fixed the usual ways. If using self-signed https, add API CA to browser and visit /. The front end should accept responses then (bug or feature?)


## TODO:
- ~~Seperate code into components~~
- ~~Refactor a bit. (add env vars)~~
- ~~Data sanitisation, validation on back end and SSL.~~
- ~~Error messages on front end for too many/little chars etc. Need to add validation on backend and logic for error response on front end.~~
- Unit tests.
- Add user auth and new schema. todos within users. serve via /user.
- More unit tests.
- Make front end pretty and add front end features.
- Alerts and push notifications to discord.
- CI and eventual production.