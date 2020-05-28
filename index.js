const express =require('express');
const app=express();

app.use(express.json);
//this method returns a piece of middleware
//then we call app.use to use that middleware in the request processing pipeline
//all this methods corresponds to http verbs or methods

//app.get()
//app.post()
//app.put()
//app.delete()
//2 argument - path or url, call back function-req,res

app.get('/',(req,res)=>{
    res.send('Hello!!!!!');

});

const PORT =process.env.PORT || 3000;
//this is the proper way 
app.listen(PORT, ()=>{
    console.log('Listerning on port 3000');
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);

});

//to get a single course obviously there should be id that is getting passed from the url
//    /api/courses/1
//id is just 
app.get('/api/courses/:id',(req,res)=>{
    //now in order to read this parameter we use
    //req.params.id
    //let just send this to the user
    res.send(req.params.id);

})
//there can be multiple parameters 
//we access them in the same way
 app.get('/api/posts/:year/:month',(req,res)=>{
     res.send(req.params);
 })

 //with expresss we can also get query string parameters
 //parameters that we add in the url after question mark
 //we use these parameters to provide additional data to our back-end services
 // localhost:3000/api/posts/2028/3? -->sortBy=name <--
//we can access this using query property
//req.query
//these query are stored as an object with a bunch of key value pair

app.get('/api/posts/:year/:month/',(req,res)=>{
    res.send(req.query);
})


//Now let's implement a new end point to get a single course from the server
const courses=[
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'}
];

app.get('/api/courses',(req,res)=>{
    //this will return the courses array if the url is like this 

    res.send(courses);

});

app.get('/api/courses/:id',(req,res)=>{
    //here we'll write a logic to look for the course with the given id 
    //can use the find method of array
 const course=   courses.find((x)=>{
        //x.id ===req.param.id
        //the thing is req.param.id gives us the string so we need to parse it
        x.id === parseInt(req.params.id)
    })
    if(!course)
    {
        //this is one of the convention of the restful api's 
        res.status(404).send('The course with the given id not found');
        return;
    }else{
        res.send(course);
        //json object to the user
    }
    
});

// app.post('/api/courses',(req,res)=>{

//     if(!req.body.name || req.body.name.length)
//     {
//         //400- bad request 
//         res.status(400).send('Name is required and must be of atleast 3 characters')
//     }
//     const course={
//         id: courses.length+id,
//         //now to get the name from the body of the url
//         //we use 
//         //req.body.name - but the thing is we can't use this property of request directly in expres
//         //so we need to parse it to json object 
//         name: req.body.name

//     };
//     courses.push(course);
//     res.send(course);

// });

//but in the above case this kind of validation is enough for the less data entry in the objects of a collection
//so we use Joi validation
//it makes the validation process super ez

const Joi= require('joi');
//yeh class hh toh first letter captical J
//first we need to define the schema





app.post('/api/courses',(req,res)=>{

    //we need a schema so that Joi can validate 
    // const schema = {
    //     name: Joi.string().min(3).required()

    // };
    // const result = Joi.validate(req.body, schema);

    //we've have defined a funcion for this validation
    //so
    const result= validateCourse(req.body);
    //if we do it like above then we we third joi validate for almost all the post and put requests
   //so for that we'll create a function and then validate 
    console.log(result);

    if(result.error)
    {
        //400- bad request 
        res.status(400).send(result.error);
        return;

    }
    const course={
        id: courses.length+id,
        //now to get the name from the body of the url
        //we use 
        //req.body.name - but the thing is we can't use this property of request directly in expres
        //so we need to parse it to json object 
        name: req.body.name

    };
    courses.push(course);
    res.send(course);

});

app.put('/api/courses/:id',(req,res)=>{
    //look up the course
    //if not existing, return 404
    const course=   courses.find((x)=>{
        //x.id ===req.param.id
        //the thing is req.param.id gives us the string so we need to parse it
        x.id === parseInt(req.params.id)
    })
    if(!course)
    {
        //this is one of the convention of the restful api's 
        res.status(404).send('The course with the given id not found');
        return;
        
    }


    //validate
    //if invalid, return 400 - bad request
    // const schema = {
    //     name: Joi.string().min(3).required()

    // };
    //const result = Joi.validate(req.body, schema);
    const result = validateCourse(req.body);

    if(result.error)
    {
        //400- bad request 
        res.status(400).send(result.error);
    }

    //update course
    course.name =req.body.name;

    //return the updated course
    res.send(course);
});

function validateCourse(course)
{
    const schema = {
             name: Joi.string().min(3).required()
    
         };
    return Joi.validate(req.body, schema);

}

app.delete('/api/courses/:id',(req,res)=>{
    //look up for the course
    const course=   courses.find((x)=>{
        //x.id ===req.param.id
        //the thing is req.param.id gives us the string so we need to parse it
        x.id === parseInt(req.params.id)
    })
    if(!course)
    {
        //this is one of the convention of the restful api's 
        res.status(404).send('The course with the given id not found');

    }

    //delete- using the splice function 
    const index =courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
    //not existing return 404

})