const express = require('express')
const app = express()
const chalk = require('chalk')
const path = require('path')
const hbs = require ('hbs')
const request = require('postman-request')
const geoRequest = require('./utils/geocode')
const forecast = require('./utils/forecast')



//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Require paths

app.set('view engine', 'hbs')
app.set('views', viewPath )
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setting up routes for the application
app.get('/', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Aleh',
        message: 'Ready to check current weather'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Aleh',
        message: 'Ready to tell something about myself'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Aleh',
        message: 'Ready to help'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.render('error', {
            message: 'You must provide the address.'
        })
}
    const address = req.query.address
    
    geoRequest(address, (error, {latitude,longitude, location} = {}) =>{
        console.log(address);
        // if(error){
        //     res.send("Unable to reach the server");
        // }
        forecast(latitude ,longitude, (error, {body}) => {
            if(error){
                res.send( 'Err' + {error});
            }
            res.send({
                forecast: `Current weather is ${body.current.temperature}, but it feels like ${body.current.feelslike}` ,
                location,
                address: req.query.address
            }) 
        })
    })
     
})

app.get('*', (req,res) => {
    res.render('error' )
})

app.listen(3000, () => {
    console.log(chalk.green.inverse('Port is open on 3000'));
})