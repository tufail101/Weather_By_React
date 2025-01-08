import weatherContex from "./weatherContex";
import { useEffect, useState } from "react";
const WeatherProvider=({children})=>{
    const [weather, setWeather] = useState('');
    const [city, setcity] = useState('USA');
    const fetchWeather=async(city)=>{
        let api_key=`55bd0b8d0ec1c9b1571cf63184e0720b`;
         let base_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        let response= await fetch(base_url);
        let data=await response.json();
        if(data.cod===200){
            setWeather(data)
        }
        else {
            setWeather(null);
            console.error("Error fetching weather:", data.message);
          } 
        
    }
    useEffect(() => {
        if (city) {
            fetchWeather(city); // Only fetch if city is not empty
          }
      }, [city]);
    

    return(
        <weatherContex.Provider value={{weather,fetchWeather,setcity}}>
            {children}
        </weatherContex.Provider>
    )
}
export default WeatherProvider;