
const city=document.querySelector('#city');
const date=document.querySelector('#date');
const wind=document.querySelector('#wind_text');
const humidity=document.querySelector('#humidity_text');
const visibility=document.querySelector('#visibility_text');
const searchButton=document.querySelector('#search-btn');
const searchForm=document.querySelector('#search_space');
const temp=document.querySelector('#temp');
const city_Name=document.querySelector('#city-name');
const weatherConditionTText=document.querySelector('#weather-condition-text'); //span weather text
const weatherImage=document.querySelector('.weather-icons'); // icon of weather
const key="d8b59f5dcbe6b648eb42aaa6c5e787ad";


async function fetchData(city){
    try{
    const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    if(!response.ok){
        throw new Error("Unable to fetch Weather Data");
    }
    const data=await response.json();
    console.log(data);
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.visibility);
    updateWeatherUI(data);
}
catch(error){
    console.log(error);
}
}


function updateWeatherUI(data){

    city.textContent=data.name;
    humidity.textContent=`${data.main.humidity}%`;
    visibility.textContent=`${(data.visibility)/1000}km`;
    wind.textContent=`${data.wind.speed}km/h`;
    temp.innerHTML=`${Math.round(data.main.temp)}<img src="celsius.png">`;
    weatherConditionTText.textContent=`${data.weather[0].main}`;
    const currDate=new Date();
    date.textContent=currDate.toDateString();
    const iCode=data.weather[0].icon;
    console.log(iCode);
    weatherImage.src=`https://openweathermap.org/img/wn/${iCode}@4x.png`;
    console.log(weatherImage.innerHTML);
   
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const city=city_Name.value;
    if(city!==""){
    fetchData(city);
    city_Name.value="";
    }
})


