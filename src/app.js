const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');
// const cors = require('cors');


console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));

const app = express();

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handelbars engines and views engine
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
// app.use(cors());

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Anany Tripathi'

    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anany Tripathi'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'I am here to help you out.',
        title:'Help',
        name:'Anany Tripathi'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
         error:'Plz provide correct address to search for'
       });
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
          return res.send({error}); 
  
        foreCast(latitude,longitude, (error, {foreCastData}={}) => {
          if(error)
            return res.send({error});

          res.send({
            forecastData:foreCastData,
            location:location
        });
    });
       
   });
  
});

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Plz provide correct search'
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:'404',
       errorMessage:"Help Article Not Found",
       name:"Anany Tripathi"
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        errorMessage:"Page not found 404",
        name:'Anany Tripathi'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on the port 3000');
});
