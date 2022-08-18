# todo-app-react

Written with MERN.

## Dev env
- Set MongoDB server URL in `srv/.env`.
- Create a db.
- Create `srv/.env` with the text (fill in your DB and SSL info):

`MONGODB_URL="<DBURLHERE>"`


`DB_NAME="<DBNAMEHERE>"`


  `PORT="1337"`


  `CORS_ORIGIN="*"`


`SSL_KEY="<SSLKEYHERE>"`


`SSL_CERT="<SSLCERTHERE>"`
- `npm run dev` in `./srv` to start back end.
- `npm start` in `./` to start front end.


## TODO:
- ~~Seperate code into components~~
- ~~Refactor a bit. (add env vars)~~
- ~~Data sanitisation, validation on back end and SSL.~~
- Error messages on front end for too many/little chars etc. Need to add validation on backend and logic for error response on front end.
- Unit tests.
- Improve css and html semantics.
- Add user auth and new schema. todos within users. serve via /user.
- More unit tests.
- Front end features.
- Alerts and push notifications.
