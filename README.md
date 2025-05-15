<h1 align="center">A simplified Jira clone built with React and Node</h1>

<div align="center">Auto formatted with Prettier, tested with Cypress 🎗</div>

<h3 align="center">
  <a href="https://jiraclone-five.vercel.app/">Visit the live app</a> 
</h3>

## Features

- Proven, scalable, and easy to understand project structure
- Written in modern React, only functional components with hooks
- A variety of custom light-weight UI components such as datepicker, modal, various form elements etc
- Simple local React state management, without redux, mobx, or similar
- Custom webpack setup, without create-react-app or similar
- Client written in Babel powered JavaScript
- API written in TypeScript and using TypeORM


 # Troubleshooting Guide 
# Steps taken to fix issues :- 

This document outlines the issues encountered during setup and their solutions.

## Setup Steps
1. Installed PostgreSQL
2. Created `.env` file with database username and password
3. Executed `npm run install-dependencies`

## Issues Encountered and Resolutions

### 1. ts-node Command Not Recognized
**Error:**
```
'ts-node' is not recognized as an internal or external command, operable program or batch file.
```

**Solution:**
Modified the start script in `package.json`:
```diff
- "start": "nodemon --exec ts-node --files src/index.ts"
+ "start": "nodemon --exec npx ts-node --files src/index.ts"
```

### 2. Database Connection Failure
**Root Cause:**
The pg (PostgreSQL client) version installed (7.18.2) was incompatible with the typeorm version (^0.2.20) used in the project. TypeORM requires pg version ^8.5.1 or later.

**Solution:**
Upgraded pg to a compatible version:
```
npm install pg@8.5.1
```

### 3. Body-Parser Deprecation Warning
**Error:**
```
body-parser deprecated undefined extended: provide extended option
```

**Solution:**
Added the extended option when using the urlencoded middleware:
```diff
- app.use(bodyParser.urlencoded());
+ app.use(bodyParser.urlencoded({ extended: true }));
```

### 4. JWT Version Compatibility Issue
**Error:**
Lower JWT version causing compatibility issues

**Solution:**
Upgraded JWT version:
```
npm install jsonwebtoken@9.0.2
```

### 5. Build Script Windows Compatibility
**Error:**
The "build" script was problematic because the `rm -rf` command is not natively supported on Windows.

**Solution:**
Used rimraf from Node.js to handle file operations cross-platform:
```
npm install rimraf --save-dev
```

Then modified the build script:
```diff
- "build": "rm -rf dist && tsc"
+ "build": "rimraf dist && tsc"
```

### 6. Process Manager Not Found
**Error:**
pm2 was not installed in api & client folder (backend & frontend)

**Solution:**
Installed pm2 globally:
```
npm install -g pm2
```

### 7. Optional Chaining Not Working
**Error:**
Optional chaining syntax (`?.`) not supported

**Solution:**
Installed Babel plugin for optional chaining:
```
npm install --save-dev @babel/plugin-proposal-optional-chaining
```

Added to `.babelrc`:
```json
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

### 8. Environment Variables Not Loading
**Error:**
Environment variables not fetched correctly

**Solution:**
Installed dotenv package:
```
npm install dotenv
```

Added to relevant files:
```javascript
require('dotenv').config();
```

## Environment Setup

Make sure to set up your `.env` file with the following variables:
```
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jira_clone
JWT_SECRET=your_jwt_secret
```

## Setting up development environment 🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `jira_development`.
- `git clone https://github.com/oldboyxx/jira_clone.git`
- Create an empty `.env` file in `/api`, copy `/api/.env.example` contents into it, and fill in your database username and password.
- `npm run install-dependencies`
- `cd api && npm start`
- `cd client && npm start` in another terminal tab
- App should now be running on `http://localhost:8080/`

## Running cypress end-to-end tests 🚥

- Set up development environment
- Create a database named `jira_test` and start the api with `cd api && npm run start:test`
- `cd client && npm run test:cypress`

