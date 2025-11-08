import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBzOVJM4eScyJSjEsBpb7BQowTq1jgGfas';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateAIResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'We apologize, but we encountered an error generating your personalized recommendations. Please try again later or contact support for assistance.';
  }
}

export async function analyzeImage(base64Image, mimeType = "image/jpeg", prompt = "Describe this image in detail") {
  try {
    // Use gemini-2.0-flash-exp which supports both text and vision
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    // Create the content parts - image first, then prompt
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    // Generate content with both image and text
    const result = await model.generateContent([imagePart, prompt]);
    
    // Wait for the response
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('Image analysis error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    // Provide more specific error messages
    if (error.message && error.message.includes('API key')) {
      return `Error: Invalid API key. Please check your Gemini API configuration.`;
    } else if (error.message && error.message.includes('quota')) {
      return `Error: API quota exceeded. Please try again later.`;
    } else if (error.message && error.message.includes('model')) {
      return `Error: Model not available. Try using gemini-1.5-flash or check API key permissions.`;
    } else if (error.message) {
      return `Error analyzing image: ${error.message}`;
    }
    
    return "Error analyzing image. Please ensure the image is valid and try again.";
  }
}
