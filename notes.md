Module 14

MVC (used models/data layer already)
view layer
controller (express will take user input and send it to view layer)

will create front end of lesson 13

14.1
Previously created app served static HTML and JS files. in these cases, JS code on front end had to make a followup request to an endpoint to display actual data. in the inital moments user sees empty layout while network request goes through. 

extra network requests can be a burden on server and app won't perform well in search engines since data and index not available on initial request. thats when a template engine (handlebars.js) comes in handy.
    can write HTML codes, leaving placeholders {{ some_data }} that can be merged in

setup handlebars.js `npm install express-handlebars`

in server: 
`const exphbs = require('express-handlebars');`
`const hbs = exphbs.create({});`

`app.engine('handlebars', hbs.engine);`
`app.set('view engine', 'handlebars');`

then create views/layouts/main.handlebars and insert default HTML template with `{{{ body }}}` where the body will go in another handlebar

layout is always: `views/layout/main.handlebars`
while other files are in `views/ExName.handlebars`

templating engines:
a way of separating html structure and code from content generated

`{{ }}` can be used for content (ex `{{vote_count}} points(s))` and attributes in HTML elements (ex. `<a href = "{{post_url}}">`)

`render( )` method can accept array, but that prevents us from adding other properties to the template later on since we are using objects.
in this lesson we add array to object and pass that to template

handlebars.js has builtin helpers that allow you to perform minimal logic like looping over array

declare variable name in `{{ }}` expression as placeholder
ex: `{{#each posts as |post| }}`

14.2
once finished with 14.1, page only works with pre-seeded data. what if users log in and create their own posts?

don't forget to add routes for handlebars to load

`async/await` allows promises to be more readable (vs. `.then( )` and `.catch(  )`)

when using `await`, can assign result of promise to var ex:
`const response = await fetch( );`

sessions allow Express.js server to keep track of which user is making a request, and store useful data about them in memory. this will help keep track of if someone is still logged in as they route to different pages of the app.
    in case session gets terminated, can store information about the session via HTML cookies aka cookies
    however, third parties can access cookies therefore never store sensitive information in them.

install session libraries with 
`npm i express-session connect-session-sequelize`
    `express-session` allows us to connect to backend
    `connect-session-sequelize` automatically stores sessions created 
        by `express-session` into our database

for logging out, need to delete/destroy session variables and reset cookie