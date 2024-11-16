import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  GenerationConfig,
  SafetySetting,
  ChatSession,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = "AIzaSyD01FGVFiZZNpWMC0rWFlFDcAL5_o7EIFo";

async function runChat(prompt: string): Promise<string> {
  if (!API_KEY) {
    console.error("API key is missing. Please provide a valid API key.");
    return "Error: API key is missing.";
  }

  if (!prompt || typeof prompt !== "string") {
    console.error("Invalid prompt. Please provide a non-empty string.");
    return "Error: Invalid input prompt.";
  }

  let genAI: GoogleGenerativeAI;
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
  } catch (error) {
    console.error("Failed to initialize Google Generative AI client:", error);
    return "Error: Initialization of AI client failed.";
  }

  let model: GenerativeModel;
  try {
    model = genAI.getGenerativeModel({ model: MODEL_NAME });
    if (!model) {
      console.error("Failed to retrieve generative model.");
      return "Error: Generative model could not be retrieved.";
    }
  } catch (error) {
    console.error("Error retrieving generative model:", error);
    return "Error: Generative model retrieval failed.";
  }

  const generationConfig: GenerationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.8,
    maxOutputTokens: 2048,
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

  let chatSession: ChatSession;
  try {
    chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    if (!chatSession) {
      console.error("Failed to start chat session.");
      return "Error: Chat session could not be started.";
    }
  } catch (error) {
    console.error("Error starting chat session:", error);
    return "Error: Failed to start chat session.";
  }

  try {
    const result = await chatSession.sendMessage(prompt);
    if (!result || !result.response) {
      console.error("Invalid response from API.");
      return "Error: No response from AI model.";
    }

    const responseText = result.response.text();
    if (!responseText) {
      console.error("Empty response text received from the model.");
      return "Error: AI model returned an empty response.";
    }

    console.log("AI Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error sending message to the chat session:", error);
    return "Error: Message sending failed.";
  }
}

export default runChat;
