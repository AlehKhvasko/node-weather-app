const request = require('postman-request')

const geoRequest = (address, callback ) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaW5ub2NlbnR0cmFkZXIiLCJhIjoiY2tsMTRkZmR1MGF1bDJwbzNha2JqdzRmNSJ9.8ss6o8M7ReRJ8Uh5Itrw8Q&limit=1`

    request({url:geoUrl, json:true}, (error, response) => {
        if(error) {
            callback(error, undefined)
        } else if(response.body.features.length === 0) {
            callback('No such results. Try again.', undefined)
        } else {
            callback('undefined', { 
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name:  response.body.features[0].place_name
            })
        }
    })
    
}

module.exports = geoRequest;