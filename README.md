# todo-app-react

Written with MERN.

## Dev env
- Set MongoDB server URL in `srv/.env`.
- Create a db named and set the name in `srv/.env`.
- Create a collection in the new DB named `todos`.
- Create `srv/.env` with the text:

`MONGODB_URL="DBURLHERE"`


`DB_NAME="todoapp"`


  `PORT="1337"`


  `CORS_ORIGIN="*"`
- `npm run dev` in `./srv` to start back end.
- `npm start` in `./` to start front end.


## TODO:
- ~~Seperate code into components~~
- ~~Refactor a bit. (add env vars)~~
- Data sanitisation and validation on back end.
- Unit tests.
- Error messages on front end for empty fields, too many chars etc.
- Improve css and html semantics.
- Write docs and mongodb schema.
- Add user auth and new schema. todos within users. serve via /user.
- Front end features.
- Alerts and push notifications.
