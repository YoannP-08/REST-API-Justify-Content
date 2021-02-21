# Content endpoint
File: `/routes/api/content.js` </br>
For every authenticated routes, the headers have to include : 
```
token: {token of the user}
```

</br>

Please refer to the file `models.md` to see the body requested for the *POST* endpoints

</br>

## POST a content 
|Route|Params|Request|Return|Access|Middleware|
|:----|:-----|:-----|:---|:-----|:---|
|`/api/justify`| |POST|Text/Plain|Private|Authentication|

</br>

Returns a "Content" justified in text/plain