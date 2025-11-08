# 🎨 AI Image Converter

This tool analyzes an input image using Google's Gemini Vision AI and generates a new image based on your prompt.

## 📋 Prerequisites

1. Node.js installed
2. An input image file named `input.jpg` in the root directory
3. Gemini API key configured in `app/utils/aiService.js`

## 🚀 Usage

### Method 1: Using the Command Line Script

1. **Place your input image** in the root directory as `input.jpg`

2. **Run the converter:**
   ```bash
   node imageConverter.js
   ```

3. **Output:**
   - Console will show the image analysis
   - Generated image will be saved as `generated_image.png`

### Method 2: Using the aiService Module

```javascript
import fs from "fs";
import { analyzeAndGenerate } from "./app/utils/aiService.js";

const base64Image = fs.readFileSync("input.jpg").toString("base64");

(async () => {
  const result = await analyzeAndGenerate(
    base64Image,
    "Place this product on a wooden table with soft lighting"
  );

  console.log("Image Analysis:\n", result.analysis);
  console.log("New Image Path:\n", result.generatedImagePath);
})();
```

## 🛠️ Available Functions

### `analyzeAndGenerate(base64Image, prompt, outputPath)`
Analyzes an image and generates a new one based on the prompt.

**Parameters:**
- `base64Image` (string): Base64 encoded image
- `prompt` (string): Description of what to create
- `outputPath` (string, optional): Path to save generated image (default: "generated_image.png")

**Returns:**
```javascript
{
  analysis: "Detailed description of the input image...",
  generatedImagePath: "path/to/generated_image.png"
}
```

### `analyzeImageFromFile(filePath, prompt)`
Analyzes an image from a file path.

**Parameters:**
- `filePath` (string): Path to the image file
- `prompt` (string): Analysis prompt

**Returns:** Analysis text (string)

### `generateImage(prompt, outputPath)`
Generates an image from a text prompt.

**Parameters:**
- `prompt` (string): Text description
- `outputPath` (string, optional): Where to save the image

**Returns:** Path to saved image (string)

## 📝 Example Prompts

```javascript
// Product photography
"Place this product on a wooden table with soft lighting"

// Style transformation
"Transform this into a watercolor painting"

// Background change
"Put this object on a beach at sunset"

// Enhancement
"Make this image look professional with studio lighting"

// Artistic style
"Convert this to a cyberpunk style with neon colors"
```

## 🔧 Configuration

### Change Output Directory
```javascript
const result = await analyzeAndGenerate(
  base64Image,
  "Your prompt here",
  "./output/my_image.png"  // Custom path
);
```

### Use Different Image Formats
The service supports: JPG, PNG, WEBP, GIF

```javascript
const base64Image = fs.readFileSync("input.png").toString("base64");
```

## ⚙️ How It Works

1. **Image Analysis**: Uses Google Gemini Vision (gemini-2.0-flash-exp) to analyze the input image
2. **Prompt Enhancement**: Combines the analysis with your prompt
3. **Image Generation**: Uses Pollinations.ai free API to generate the new image
4. **Save**: Saves the generated image to the specified path

## 🌐 Web Interface

The same functionality is available through the web interface at:
`http://localhost:3000/get-started/image-generator`

## 🐛 Troubleshooting

### "Model not available" error
- The Gemini API key needs vision model access
- Current implementation uses `gemini-2.0-flash-exp` which supports vision

### Image generation fails
- Check your internet connection
- Pollinations.ai service might be temporarily unavailable
- Try a different, more specific prompt

### File not found
- Ensure `input.jpg` exists in the root directory
- Check file permissions

## 📦 Dependencies

```json
{
  "@google/generative-ai": "latest",
  "fs": "built-in",
  "path": "built-in"
}
```

## 🎯 Tips for Best Results

1. **Be specific** in your prompts
2. **Describe lighting, mood, and style** clearly
3. **Use high-quality input images** for better analysis
4. **Experiment** with different prompts to get desired results

## 📄 License

This tool uses:
- Google Gemini API for image analysis
- Pollinations.ai for image generation (free service)
