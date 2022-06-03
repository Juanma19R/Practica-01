import React, {useState} from 'react';

//Components
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {

    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=9a67cf86041eb89bcbbe9eecf5a3e02e&lang=es";
    let cityUrl = "&q=";
    let urlForecast = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9a67cf86041eb89bcbbe9eecf5a3e02e&lang=es"

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true);
        setLocation(loc);

        //Weather
        urlWeather = urlWeather + cityUrl + loc;

        await fetch(urlWeather).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

        //Forecast
        urlForecast = urlForecast + cityUrl + loc;

        await fetch(urlForecast).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);
            setLoading(false);
            setShow(true);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });
    }

    return(
        <React.Fragment>
            <Form
                newLocation = {getLocation}
            />
            <Card 
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}
            />
        </React.Fragment>
    );
}

export default WeatherPanel;