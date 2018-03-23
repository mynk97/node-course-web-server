const express=require('express');
const hbs =require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{
  var now= new Date().toString();
  var log= `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});

/*app.use((req,res,next)=> {
  res.render('maintenance.hbs');
});*/

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt',(text)=>{
 return text.toUpperCase();
});

app.get('/',(req,res) =>{
    //res.send('<h1> hello express </h1>')
    res.render('home.hbs',{
      WelcomeMessage: 'Welcome to my page',
      PageTitle: 'Home Page'
    });
});

app.get('/projects',(req,res)=> {
  res.render('project.hbs', {
    PageTitle: 'Projects',
    portfolio: 'Its a portfolio'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
  	PageTitle: 'About Page'
  });
});



app.get('/bad', (req,res) => {
 res.send({
 	errorMessage: 'unable to get requset'
 })
});

app.listen(port,() =>{
	console.log(`server is up on port ${port}`);
});











/*const express=require('express');

const hbs =require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.get('/', (req,res) => {
	res.send({
		name: 'arun',
		likes: ['biking',
		         'cities'
		        ]
	});
 //res.send('<h1>hello express!</h1>');
});

app.get('/about',(req,res) => {
    res.render('about.hbs');
  //res.send('About Page');
});

app.get('/bad', (req,res) => {
	res.send({
           errorMessage: 'unable to handle request'
	});
});

app.listen(3000 , () =>{
	console.log('Server is up on port 3000'); 
});*/