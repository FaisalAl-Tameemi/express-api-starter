
# Express API Starter Kit

## Getting Started

### Prerequisites

- Postgres(>=9.4)
- Sequelize CLI (`[sudo] npm install -g sequelize-cli`)


### Folder Architecture

```
├── mocha.conf.js
├── package-lock.json
├── package.json
├── server
│   ├── api
│   │   ├── thing
│   │   │   ├── index.js
│   │   │   ├── thing.controller.js
│   │   │   ├── thing.events.js
│   │   │   ├── thing.helper.js
│   │   │   ├── thing.model.js
│   │   │   └── thing.socket.js
│   │   └── user
│   │       ├── index.js
│   │       ├── user.controller.js
│   │       ├── user.events.js
│   │       └── user.model.js
│   ├── auth
│   │   ├── auth.service.js
│   │   ├── facebook
│   │   │   └── ...
│   │   ├── google
│   │   │   └── ...
│   │   ├── index.js
│   │   ├── local
│   │   │   └── ...
│   │   └── twitter
│   │       └── ...
│   ├── components
│   │   ├── errors
│   │   │   └── index.js
│   │   └── utils
│   │       ├── logger.js
│   │       └── responses.js
│   ├── config
│   │   ├── environment
│   │   │   ├── development.js
│   │   │   ├── index.js
│   │   │   ├── production.js
│   │   │   ├── shared.js
│   │   │   └── test.js
│   │   ├── express.js
│   │   ├── local.env.sample.js
│   │   └── socketio.js
│   ├── index.js
│   ├── routes.js
│   └── sqldb
│       ├── config.js
│       ├── index.js
│       ├── migrations
│       │   └── ...
│       └── seeders
│           └── ...
└── yarn.lock

32 directories, 81 files
```


### Running the server

1. Run `npm install` to install server dependencies.

2. Edit the `./server/config/development.js` file and enter the correct postgres DB connection variables.

3. Run `npm run dev` to start the development server.


### Migrations & Seeds

Migrations and seeds are placed in `./server/sqldb/migrations` and `./server/sqldb/seeders` respectively.

#### Running Migrations

To run all pending migrations, run the following command:

```
npm run migrate
```

To reverse all migrations: 

````
npm run migrate:undo
````

More about [Sequelize Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)


#### Running Seeds

To run all seeds, run the following command:

```
npm run seed
```

To reverse all seeds: 

````
npm run seed:undo
````

More about [Sequelize Seeds](http://docs.sequelizejs.com/manual/tutorial/migrations.html#running-seeds)


## Testing

> __TODO:__ Add tests w. mocha vs. jest... 
Running `npm test` will run the unit tests with karma.
