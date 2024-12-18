const axios = require('axios');
const config = require('../config');

const getWeather = async (city) => {
    try {
        const response = await axios.get(`${config.weatherUrl}${city}`);
        const weatherData = response.data;
        const temperature = weatherData.current.temp_c;
        const condition = weatherData.current.condition.text;

        return `Temperature: ${temperature}°C, Condition: ${condition}`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return "Sorry, I couldn't find this city.";
    }
};

module.exports = { getWeather };