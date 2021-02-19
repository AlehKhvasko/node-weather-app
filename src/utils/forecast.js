const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const geoUrl = 'http://api.weatherstack.com/current?access_key=826d7fbd94a3da74e606e9d534a5a19f&query=' + latitude + ',' + longitude +'&units=m'
    request({url:geoUrl, json:true}, (error,response) =>  {
        {  debugger
            if(error){
                callback('wtf',undefined)
            } else if(response.error) {
              
                callback('Unable to get your request. Please try again later.', undefined)
                debugger
            } else {
                callback(undefined, response)
            }} 
    } 
    )}

    module.exports = forecast