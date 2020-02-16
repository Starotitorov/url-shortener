# url-shortener

URL shortener application which is written in JavaScript using Express and MongoDB.

![Screenshot](screenshots/screenshot.png)

## Routes

The application has next routes:

### GET /

**Response**

Returns index.html file.

### POST /api/shorten

**Parameters**

| Name | Required | Type   | Description              |
| ---- | -------- | ------ | ------------------------ |
| url  | required | string | The URL to be shortened. |

**Response**

```
{
  "shortUrl": "http://localhost:3000/b"
}
```

### GET /:encodedId

**Parameters**

| Name      | Required | Type   | Description                                                               |
| --------- | -------- | ------ | ------------------------------------------------------------------------- |
| encodedId | required | string | The URL id returned in the response from the `/api/shorten` API endpoint. |

**Response**

Redirects to the URL.
