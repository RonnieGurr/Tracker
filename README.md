# Tracker

## Installation 

### Dependencies

MongoDB (On-Prem) - https://www.mongodb.com/try/download/community
Node JS - https://nodejs.org/en/

### Setup

```bash
$ git clone https://github.com/RonnieGurr/Tracker.git
$ cd Tracker/
$ npm install
```

### MongoDB

Start MongoDB

```bash
$ mongo
$ use tracker
$ db.createUser(
  {
    user: "YOUR USERNAME",
    pwd: "YOUR PASSWORD", 
    roles: [
       { role: "readWrite", db: "tracker" }
    ]
  }
)
$ db.users.save({ email: "YOUR EMAIL", password: "YOUR MD5 PASSWORD" })
```

### Settign Up .env

```bash
$ cd Tracker/
$ node
$ require('crypto').randomBytes(64).toString('hex') - x2
$ nano .env

    API_PORT= THE PORT YOU WANT THE BACKEND SERVER TO RUN ON

    DB_CONNECTION='mongodb://YOUR-DB-USER-NAME:YOUR-DB-PASSWORD@localhost:27017/tracker'
    ACCESS_TOKEN_SECRET= USE HASH FROM 3RD COMMAND (MAKE SURE THIS IS UNQIUE TO THE REFRESH TOKEN)
    REFRESH_TOKEN_SECRET= USE HASH FROM 3RD COMMAND 

    SAVE AND EXIT
```

### Start

```bash
$ cd Tracker/
$ npm start
$ npm run devStart
  OR
$ node api/server.js
```
