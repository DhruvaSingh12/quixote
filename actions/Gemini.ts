import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  GenerationConfig,
  SafetySetting,
  ChatSession,
} from "@google/generative-ai";

const API_KEY: string = process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY || "";
const MODEL_NAME = "gemini-1.5-flash";

if (!API_KEY) {
  throw new Error("API key is missing. Please provide a valid API key in the .env file.");
}

function initializeClient(): GoogleGenerativeAI {
  try {
    return new GoogleGenerativeAI(API_KEY);
  } catch (error) {
    throw new Error(`Failed to initialize Google Generative AI client: ${error}`);
  }
}

async function getModel(genAI: GoogleGenerativeAI): Promise<GenerativeModel> {
  try {
    const model = await genAI.getGenerativeModel({ model: MODEL_NAME });
    if (!model) throw new Error("Generative model could not be retrieved.");
    return model;
  } catch (error) {
    throw new Error(`Error retrieving generative model: ${error}`);
  }
}

const generationConfig: GenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.9,
  maxOutputTokens: 1024,
};

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Function to start a chat session and send a message
async function runChat(prompt: string): Promise<string> {
  if (!prompt || typeof prompt !== "string") {
    return "Error: Invalid input prompt. 😕☹️";
  }

  const genAI = initializeClient();
  const model = await getModel(genAI);

  try {
    const chatSession: ChatSession = await model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    if (!chatSession) {
      throw new Error("Chat session could not be started. 😭😢");
    }

    const result = await chatSession.sendMessage(prompt);
    const responseText = result?.response?.text();

    if (!responseText) {
      throw new Error("AI model returned an empty response. 😖😓");
    }

    console.log("AI Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error during chat session:", error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return "Error: An unknown error occurred. ☹️😔";
    }
  }
}

export default runChat;
