# Users endpoints
File: `/routes/api/auth.js`
Please refer to the file `models.md` to see the body requested for the *POST* endpoints

<br/>

## SIGNUP user
|Route|Params|Request|Return|Access|
|:----|:-----|:-----|:---|:-----|
|`/api/auth/signup`| |POST|Object|Public|

Return an object with a success field, a token field, and a user object with fields :
* id
* email
* password hash
* counter

<br/>
<br/>

## SIGNIN user
|Route|Params|Request|Return|Access|
|:----|:-----|:-----|:---|:-----|
|`/api/auth/signin`|  |POST|Object|Public|

Return an object with a success field, a token field, and a user object with fields :
* id
* email
* counter