/**
 * weatherFunctions.ts
 * 
 * This module provides functionalities related to fetching weather data using the OpenWeather API.
 */

import fetch from 'node-fetch';

// Retrieve the OpenWeather API Key from environment variables. Ensure this key is defined in your .env.local file.
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch the current weather data for a given city.
 * 
 * @param city - The name of the city to fetch the weather data for.
 * @returns An object containing temperature, weather description, city name, and country.
 * @throws Will throw an error if the API request fails or if the provided city is not found.
 */
export async function checkWeather(city: string): Promise<any> {
    const url = `${BASE_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Log the raw weather data received from the API
    console.log(`Weather for city ${city}: ${JSON.stringify(data)}`);

    if (response.status !== 200) {
        throw new Error(data.message);
    }

    return data;
}

