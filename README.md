# Backend
Node/ Express / SQL Lite / Knex Backend 

BASE URL: https://anywherefitnessclasses.herokuapp.com/

CLASSES ENDPOINTS:

/api/classes

///////////

[GET] All Classes

Send GET request to /api/classes

///////////

[GET] Class By Id

Send GET request to /api/classes/:Id , passing through Id of the user

///////////

[GET] Class By ClassId

Send GET request to /api/classes/ClassId/:ClassId , passing through ClassId

///////////

[PUT] / Update Class By Id

Send PUT request to /api/classes/:id , passing through Updated Class and Id

Requires: -Id -Name

Takes: -Id -Name -Type -StartTime -Duration -IntensityLevel -Location -Attendees -MaxClassSize

///////////

[PUT] / Update Class By ClassId

Send PUT request to /api/classes/ClassId/:ClassId , passing through Updated Class Which Has The ClassId Property

Requires: -ClassId -Name

Takes: -ClassId -Name -Type -StartTime -Duration -IntensityLevel -Location -Attendees -MaxClassSize

//////////

[POST] New Class

Send POST request to /api/classes/ , passing through new class

Requires: -ClassId -Name

Takes: -ClassId -Name -Type -StartTime -Duration -IntensityLevel -Location -Attendees -MaxClassSize

//////////

[DELETE] Class By Id

Send DELETE request to /api/classes/:id , passing through id within parameters

Requires: -Id within the parameters

Takes: -Id within the parameters 

//////////

[DELETE] Class By ClassId

Send DELETE request to /api/classes/ClassId/:ClassId , passing through ClassId to be deleted

//////////////////////////

USERS ENDPOINTS:

/api/users

//////////

[GET] Users Classes By User Id

Send GET request to /api/users/:id/classes

Requires: -Id in Params

Takes: -Id In Params

/////////