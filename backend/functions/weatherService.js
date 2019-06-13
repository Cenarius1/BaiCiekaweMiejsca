const fetch = require("node-fetch");

const apiKey = "90e0cff7b403e125642704f4c61af12c";

module.exports = async (longitude, latitude) => {
    const result = {
        success: true,
        errorMessage: undefined,
        payload: undefined
    }

    try {
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        console.log("request executed");
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            console.log("data jsoned");
            const data = {
                name: weatherData.name,
                weather: {
                    main: weatherData.weather[0].main,
                    description: weatherData.weather[0].description
                },
                temperature: {
                    min: weatherData.main.temp_min,
                    max: weatherData.main.temp_max,
                    temp: weatherData.main.temp
                },
                windSpeed: weatherData.wind.speed,
            };

            console.log("data mapped");

            result.payload = data;
        } else {
            result.success = false;
            result.errorMessage = `Result doesn't doesn't indicate success, statusCode: ${weatherResponse.status}`;
        }
    } catch (err) {
        result.success = false;
        result.errorMessage = `Exception occured during gathering weather data: ${err.message}`;
    }

    console.log("returning result");

    return result;
}