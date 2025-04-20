const request = require('request');

const foreCast=(lat,lon,callback)=>{
    const url = 'https://api.weatherstack.com/current?access_key=e47ea69800addbedf496ed8d7b2b3a89&query='+lat+','+lon+'&units=f';
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(body.error){
            callback('Unable to find location . Try Another Location',undefined);
        }else{
            callback(undefined,{
                // temperature:body.current.temperature,
                // humidity:body.current.humidity,
                foreCastData:body.current.weather_descriptions[0]+'.'+' It is currently '+body.current.temperature+' degrees out. '+'There is '+body.current.cloudcover+ '% chance of rain.'
            });
        }
    });
}
module.exports=foreCast;