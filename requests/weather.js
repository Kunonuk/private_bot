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

        return `
        Country: ${country}, 
        Temperature: ${temperature}°C, 
        Condition: ${condition}, 
        Air Quality:` + await airQuality(air);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        return "Sorry, I couldn't find this city.";
    }
};

const airQuality = async (air) => {
    console.log(air)

    const airQualityTable = [
        {max: 12.5, description: " is good 🤗"},
        {max: 25, description: " is fair 👍"},
        {max: 50, description: " is poor 👎🏻"},
        {max: 150, description: " is very poor 🆘"},
        {max: 300, description: " what the fuck is going on? 🤬"}
    ]

    for (let i = 0; i < airQualityTable.length; i++) {
        if (air < airQualityTable[i].max) {
            return airQualityTable[i].description;
        }
    }
    return " it is hell!"
}

module.exports = { getWeather };