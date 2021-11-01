# Two to Tango - Challenge

This is a server nodejs app that list users from the OS. Works for Windows and Linux (Ubuntu tested)

## Installation

1. Clone the repository.

2. Update config.js file by adding your secret keys

3. run the following command.

```bash
npm install
```

## Usage

To start the server execute.

```
npm start
```

There are three endpoints:

- /api/login | Creates your token and refresh token
>Param {"username": "USERNAME","password": "PASSWORD"}
- /api/token | To be used when your token expires
>Param {"username": "USERNAME","refreshToken":"REFRESH_TOKEN"}
- /users/ | While being logged in, you can call this endpoint
>Add header: **x-access-token** with your TOKEN value

## Additional documentation

Documentation and examples on swagger

https://localhost:3000/api-docs/
