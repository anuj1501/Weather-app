const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()
const port = process.env.PORT || 3000

//defines paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory serve
app.use(express.static(publicDirectorypath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'andrew mead',
        creator:'Created by Anuj Raghani'
    })
})


app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        creator:'Created by Anuj Raghani'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        creator:'Created by Anuj Raghani'
    })
})

// app.get('/about',(req,res) => {
//     res.send({
//         name: 'anuj',
//         age : '20'
//     })
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide the address"
        })
    }
    else{
        geocode.geocode(req.query.address,(error,data) => {
            if(error)
            {
                console.log(error)
            }
            else
            { 
                forecast.weather(data,(error,forecastdata) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        res.send({
                        location:data.location,
                        forecast:forecastdata.report
                        })
                    }
                })
            }
        })
    }
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a search term"
        })
    }
    else{
        console.log(req.query)
        return res.send({
            products:[]
        })
    }
})




app.get('/help/*',(req,res) => {
    res.send('Help article not found')
})

app.get('*',(req,res) => {
    res.send('404 Page Not Found')
})

app.listen(port,() => {
    console.log('server is up on port' + port)
})
