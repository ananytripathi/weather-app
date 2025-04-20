const request = require('request');

const geoCode = (address,callback)=>{
    const url = 'https://geocode.maps.co/search?q='+ encodeURIComponent(address) +'&api_key=67a9b9119f8e1390263766ifo4ac9b6';
    request({url,json:true},(error,response)=>{
      console.log(response);
        if(error){
          callback('Unable to connect to the geoCode service!',undefined);
        }else if (response.body.length===0){
          callback('Unable to find location. Try another search.',undefined);
        }else{
          callback(undefined,{
              latitude:response.body[0].lat,
              longitude:response.body[0].lon,
              location:response.body[0].display_name
          });
        }
    })
  }

 module.exports = geoCode;