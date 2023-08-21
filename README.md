# Next.js Chat Application with OpenAI Integration

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The application integrates with OpenAI to provide a conversational AI chat interface. Users can interact with the chatbot to get weather updates and search for products.

## Features

- **OpenAI Chatbot Integration**: Engage in a dynamic conversation with the integrated AI.
- **Weather Lookup**: Ask the bot about the weather in any city.
- **Product Search**: Use the bot to search for products from a mock store.
- **Dynamic UI**: Utilizes React components to render chat messages dynamically.
- **Font Optimization**: Uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) for automatic font optimization.

## Getting Started

### Prerequisites

1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Obtain API keys for OpenAI and OpenWeather (if necessary).

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:**
   ```bash
   cd <project-name>

### Install Dependencies:
3. 

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install

### Create a `.env.local` file at the root of your project and add your API keys:
4. Setup your API keys (for OPENWEATHER_API_KEY, put your key in single quote. '###..' )
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    OPENWEATHER_API_KEY='your_openweather_api_key'

## Running the Application

5. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Interact with the chatbot to explore its features.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
