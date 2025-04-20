console.log('Client Side Javascript file is loaded');

const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';
// messageTwo.textContent = '';

weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        console.log(response.status);
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
             } else {
               console.log(data.forecastData);
               console.log(data.location);
               messageOne.textContent = data.location;
               messageTwo.textContent = data.forecastData;
            }
        })
    })
})