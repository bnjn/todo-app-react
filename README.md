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


## TODO:
- ~~Seperate code into components~~
- ~~Refactor a bit. (add env vars)~~
- ~~Data sanitisation, validation on back end and SSL.~~
- Convert POST text to HTML entities before storing in DB (backend).
- Error messages on front end for too many/little chars etc. Need to add validation on backend and logic for error response on front end.
- Unit tests.
- Improve css and html semantics.
- Add user auth and new schema. todos within users. serve via /user.
- More unit tests.
- Front end features.
- Alerts and push notifications.
