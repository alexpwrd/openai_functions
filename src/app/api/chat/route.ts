/**
 * route.ts
 * 
 * This module provides the main routing logic for handling API requests. It integrates
 * with the OpenAI API to generate dynamic responses based on user prompts and also provides
 * auxiliary functions like `search_products` and `check_weather`.
 */

// Import utility functions for product search and weather checking
import { searchStore } from '../functions/utilityFunctions';
import { checkWeather } from '../functions/weatherFunctions';

// Import necessary modules from the OpenAI package
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Define the runtime environment
export const runtime = 'edge';

// Configure the OpenAI API with the API Key from environment variables
const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Initialize the OpenAI API with the provided configuration
const openai = new OpenAIApi(apiConfig);

/**
 * Handles POST requests to generate dynamic responses using OpenAI.
 * 
 * @param req - The incoming request object containing user messages.
 * @returns - A StreamingTextResponse which streams the AI-generated response.
 */
export async function POST(req: Request) {
  // Extract user messages from the request body
  let { messages } = await req.json();

  // Define a system-level instruction for the AI model
  const systemMessage = {
    role: "system",
    content: "You are a helpful assistant. You can search products using the search_products function and check the weather of any city using the check_weather function."
  };

  // Add the system-level instruction to the beginning of the messages array
  messages = [systemMessage, ...messages];

  // Generate a response from OpenAI based on the user's messages and the system instruction
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages: messages,
    // Define the custom functions available for the AI to use
    functions: [
      {
        name: 'search_products',
        description: 'Search for products in a mock store',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query for products.',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'check_weather',
        description: 'Check the weather for a given city',
        parameters: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'The name of the city to check weather for.',
            },
          },
          required: ['city'],
        },
      },
    ],
  });

  // Process and handle the response from OpenAI
  const stream = OpenAIStream(response, {
    async experimental_onFunctionCall({ name, arguments: args }, createFunctionMessages) {
      // Handle the search_products function call
      if (name === 'search_products') {
        const { query } = args;
        const products = await searchStore(query);
        return openai.createChatCompletion({
          model: 'gpt-3.5-turbo-0613',
          stream: true,
          messages: [...messages, ...createFunctionMessages({
            products: JSON.stringify(products),
          })],
        });
      }
      // Handle the check_weather function call
      else if (name === 'check_weather') {
        const { city } = args;
        try {
            const weather = await checkWeather(city);
            return openai.createChatCompletion({
              model: 'gpt-3.5-turbo-0613',
              stream: true,
              messages: [...messages, ...createFunctionMessages({
                weather: JSON.stringify(weather),
              })],
            });
        } catch (error) {
            throw error;
        }
      }
      // Error handling for unsupported function calls
      throw new Error(`Function ${name} is not supported`);
    },
  });

  // Return the processed response as a stream
  return new StreamingTextResponse(stream);
}
