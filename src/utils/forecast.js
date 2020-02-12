const request = require('request')


const weather = ({latitude,longitude},callback) => {
    const url = 'https://api.darksky.net/forecast/fbf72bdeb9b3828a67261d60dfd99a31/' + latitude + ',' + longitude;

    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                report : "It is currently " + response.body.currently.temperature + " degrees out there.There is a " +  response.body.currently.precipProbability + " % chance of rain."
            })
        }
    })
}

module.exports = {
    weather:weather
}