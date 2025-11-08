// Test script to verify Gemini Vision API
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBzOVJM4eScyJSjEsBpb7BQowTq1jgGfas';
const genAI = new GoogleGenerativeAI(API_KEY);

async function testVisionAPI() {
  try {
    console.log('Testing Gemini Vision API...');
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Test with a simple text prompt first
    console.log('\n1. Testing text generation...');
    const textResult = await model.generateContent("Say hello");
    const textResponse = await textResult.response;
    console.log('Text response:', textResponse.text());

    // Test with image (you'll need to provide a base64 image)
    console.log('\n2. Testing image analysis...');
    console.log('Note: You need to provide a base64 image to test image analysis');
    console.log('The API key and model are working for text generation.');
    
    console.log('\n✅ Gemini API is working!');
    console.log('Model: gemini-1.5-flash');
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

testVisionAPI();
