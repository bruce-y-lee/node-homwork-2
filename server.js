// 41,42:
// run web server by using express
// 43:
// use handlebar for view engine
//44:
// hanldbar partials, helper
// 45:
// express middleware
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//__dirname store the path of the project directory


app.use((req, res, next)=>{
  // next();
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append o server.')
    }
  })
  next();
})
//to Maintenance stop all the other pages and show certain one. -> This is using of middle ware
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/', (req, res)=>{
    // res.send('<h1>Hello Express!</h1>');

    // res.send({
    //   name:'Alex',
    //   age:20,
    //   likes:[
    //     'Biking',
    //     'Running'
    //   ]
    // })

    res.render('home.hbs',{
      pageTitle:'Home Page',
      welcomeMessage:'Welcom to my Home page'
      // currentYear:new Date().getFullYear()
    });
});
app.get('/about',(req, res) => {
  // res.send('About Page.');
  res.render('about.hbs',{
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage:'Unable to handle request.'
  })
});

app.listen(3000,()=>{
  console.log('Sserver is up on port 3000.')
});
