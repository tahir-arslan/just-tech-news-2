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

14.3
- can now log in users and allow them to comment/upvote posts

creating upvote functionality, using async function with `fetch( )` request that needs two things for PUT: `post_id` and `user_id`
    `user_id` supplied from back end, can use `post_id` from query `http://localhost:3001/post/1` by splitting url based on `/` and taking last item in split array

initially we created the `fetch( )` request only using `post_id`. if testing functionality now, will get an error since it requires `user_id` to be provided, but can test to see if it worked by inspecting headers panel

want to hide upvote and comment features for users who aren't logged in. so will use handlebars.js to create a toggle view functionality using `{{ #if }}` which acts a lot like JS `if`'s and only checks truthy values

14.4
`Partial` is a templating technique (not unique to handlebars.js), that help minimize repeated code across templates (just like how templates reduce repeated code across pages)
    can extract smaller components from template to reuse in other templates
        create `views/partials/`

to use partial, need a `>` followed by name of partial file and object being passed (ex `{{> post-info post }}`)
    when passing object into partial, we don't pass object as is but rather pass in all of the properties of that object
This works in a similar way to destructuring the properties of an object in a function’s parameters. Consider the following code:
        function doSomething({name, description}) {
            console.log(post); // prints "undefined"
        }
        const post = {name: 'test post', description: 'a test post'};
        doSomething(post);
This code would give us an error because `doSomething( )` has no knowledge of the keyword `post`.
    to fix this, need to update all variables to not use `object.<property>` and instead just use property names.

when dealing with `post` in this lesson, it is an `array` so passing it in does not destructure it like it does passing in an `object`. So we can access it's data with the `this` keyword
    this is because arrays don't have named properties like objects

helper function (ex. `#each`) allow us to add small bits of logic/data manipulation to template itself. and since helpers are functions, we can unit test them.
    can also create our own custom helpers (see `utils/helpers.js` for this lesson's custom helper) and then use custom defined helper as before (ex. `{{ #customHelperFunction }}`)
        14.4.5 video example
            const exphbs = require('./express-handlebars');
            const helpers = require('./utils/helpers.js');

            // pass through `helpers` using create method
            const hbs = exphbs.create({ helpers });

            // call `.engine` method to prime custom helpers to be used 
            // in view engine
            app.engine("handlebars", hbs.engine);
        
in partials:
    `{{format_date created_at}}` = saying `format_dates(created_at)`

question direct from lesson:
    The last helper, format_plural, takes two arguments, so how would we write it?
        We're not using () to pass arguments, so we can separate arguments with spaces.

