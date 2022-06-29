***INCOMPLETE***


want to create a dockerized server that listens on port 4001 and allows you to send 
it a json with two expected fields: message and 


We need:

requests.rest 
package.json
package-lock.json
server.js
authServer.js


authServer.js needs:
- /token
- /logout
- /login
- generateAccessToken

server.js needs:
- (get) /caesar
- authenticateToken middleware
