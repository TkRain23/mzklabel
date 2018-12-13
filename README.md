# mzklabel

> An API for music labels

## What it is

mzklabel allows you to create and view details about music
labels

Check out the site [here](http://mzklabel.herokuapp.com/)

Check out the documentation [here](http://www.timothykaing.com/mzklabel/#/)


## Features

- User authentication
- Ability to create music labels
- Quickly obtain label information

# Quick start
## Initialize
Use `mzklabel.herokuapp.com/` for all your routes. Create a user, then use the routes accordingly.
## Label Object
`Label` objects are individual labels with the following fields:
```
Label = {
    name: String, // required, unique
    founder: String,
    verified: Boolean, // default false
    description: String // label description
    artists: Array of Strings // artist(s)
    genre: Array of Strings // genre(s)
    country: String // country of origin
}
```
## User Object
`User` objects are individual users with the following fields:
```
User = {
    username: String, // required, unique
    password: String, // required
    description: String, // short description
    createdAt: Data, // date created
    updatedAt: Data, // date updated
    labelsCreated: Schema.Types.ObjectId // labels created
}
```
# Authentication
## New User
`POST /authentication/`

takes a JSON req.body argument of a new user and returns the javascript web token to the cookie.
```
.post('mzklabel.herokuapp.com/authentication').send({
  username: 'user',
  password: 'pass',
});
```

## Login User
`PUT /authentication/`

takes a JSON req.body argument of a preexisting user issues a authentication token.
```
.post('mzklabel.herokuapp.com/authentication').send({
  username: 'user',
  password: 'pass',
});
```
## Logout User
`DELETE /authentication/`

takes a JSON req.body argument of a preexisting user and removes the authentication token.
```
.post('mzklabel.herokuapp.com/authentication').send({
  username: 'user',
  password: 'pass',
});
```

# Music Labels
## View all labels
`GET /labels/`

load all music labels
```
.get('mzklabel.herokuapp.com/api/v1/labels')
```
## View one label
`GET /labels/:name`

loads an individual label and its associated details
```
.get('mzklabel.herokuapp.com/api/v1/labels:name').send({
  name: 'OWSLA',
  founder: 'Skrillex',
  verified: 'True',
  description: 'Good people. Good times. The Mothership.',
  artists: ['Porter Robinson', 'Zedd'],
  genre: ['Electro House', 'Dubstep', 'House'],
  country: 'USA',
});

```
## Update label
`PUT /labels/:name`

updates an individual label
```
.put('mzklabel.herokuapp.com/api/v1/labels:name').send({
  name: 'OWSLA',
  founder: 'Skrillex',
  verified: 'True',
  description: 'Good people. Good times. The Mothership.',
  artists: ['Porter Robinson', 'Zedd'],
  genre: ['Electro House', 'Dubstep', 'House'],
  country: 'USA',
});

```
## Delete label
`DELETE /labels/:name`

removes an individual label
```
.delete('mzklabel.herokuapp.com/api/v1/labels:name').send({
  name: 'OWSLA',
  founder: 'Skrillex',
  verified: 'True',
  description: 'Good people. Good times. The Mothership.',
  artists: ['Porter Robinson', 'Zedd'],
  genre: ['Electro House', 'Dubstep', 'House'],
  country: 'USA',
});

```
