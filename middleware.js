const express = require('express')
const app = express()

//to use that middleware
app.use(loggingMiddleware);
//now this will run before any of the single request
//if we include this after the requests  | then we will get Homepage being printed out 
//because we're never actually calling the next in our actions
//that's why we always put this at the top
//so that it runs before all of different controller actions

app.get('/', (req, res) => {
  res.send('Home Page');
  console.log('Homepage')
})

//including one more middleware here
app.get('/users', auth, (req, res) => {
  res.send('Users Page')
  console.log('users page');
}) //o/p as inside middleware then inside auth middleware and then users page
//here
function loggingMiddleware(req, res, next) {  

    console.log('Inside Middleware')
    next()
}

function auth(req, res, next) {  

    console.log('Inside auth Middleware')
    next()
}
app.listen(3000, () => console.log('Server Started'))