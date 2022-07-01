Please run the following to start the servers:

"npm i express nodemon jwt"

Then use:

"docker-compose up --build" 

to run the servers.


(listening on port 4000)
authServer.js:

- /token: (POST)

    req: Should contain json with field "token" with value <refresh_token>
    res: New access token with reset time till expiry


- /createAccount: (POST)

    req: Should contain fields "username" and "password"
    res: Empty result, status 201

- /login: (POST)

    req: Should contain fields "username" and "password"
    res: Json response of form:
    {
        "accessToken": "aaaaa.bbbbb.ccccc",
        "refreshToken": "xxxxx.yyyyy.zzzzzz"
    }


(Listening on port 3000)
server.js:

- /caesar: (POST)

    req: json containing "message" and "shift" (integer) fields and values
    res: json with field "shifted" and value of the input message shifted by the
    input shift using the Caesar Cipher method


- FUNCTION(authenticateToken) (middleware):

    Uses javascript jwt library to verify a users token.





