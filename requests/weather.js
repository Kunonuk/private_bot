const axios = require('axios');
const config = require('../config');

const getWeather = async (city) => {
    try {
        const response = await axios.get(`${config.weatherForecastUrl}${city}`);
        const weatherData = response.data;
        const temperature = weatherData.current.temp_c;
        const condition = weatherData.current.condition.text;
        const air = weatherData.current.air_quality.pm2_5;
        const country = weatherData.location.country;

        return `Country: ${country}, Temperature: ${temperature}°C, Condition: ${condition}, Air Quality:` + await airQuality(air);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return "Sorry, I couldn't find this city.";
    }
};

const airQuality = async (air) => {
    console.log(air)

    if (air < 12.5) {
        return " is good 🤗"
    } else if (air > 12.5 && air < 25) {
        return " is fair 👍"
    } else if (air > 25 && air < 50) {
        return " is poor 👎🏻"
    } else if (air > 50 && air < 150) {
        return " is very poor 🆘"
    } else if (air > 150 && air < 300) {
        return " what the fuck is going on? 🤬"
    }
}

module.exports = { getWeather };