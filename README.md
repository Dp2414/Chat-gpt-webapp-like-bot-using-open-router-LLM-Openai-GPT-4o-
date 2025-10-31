# AI Chat Application

A full-stack conversational AI chatbot that provides intelligent responses with conversation memory using OpenAI's GPT-4 model. The application features a modern chat interface with persistent conversation history stored in MongoDB.

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Material-UI Icons
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- OpenAI API (via OpenRouter)

## Data Flow

1. **User Input** → Frontend captures user message
2. **History Context** → Frontend sends current input + conversation history to backend
3. **AI Processing** → Backend formats messages and sends to OpenAI GPT-4 via OpenRouter
4. **Database Storage** → Input and response are saved to MongoDB
5. **Response Delivery** → AI response is sent back to frontend and displayed
6. **Memory Persistence** → Conversation history is maintained for context-aware responses

## Setup

1. Install dependencies: `npm install` (both frontend and backend)
2. Create `.env` file with `OPENAI_API_KEY=your_key`
3. Start backend: `npm start` (port 3000)
4. Start frontend: `npm run dev` (port 5173)"# Chat-gpt-webapp-like-bot-using-open-router-LLM-Openai-GPT-4o-" 
