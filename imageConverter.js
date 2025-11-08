import fs from "fs";
import { analyzeAndGenerate } from "./app/utils/aiService.js";

// Read the input image
const base64Image = fs.readFileSync("input.jpg").toString("base64");

(async () => {
  try {
    console.log('🎨 Starting image analysis and generation...\n');
    
    const result = await analyzeAndGenerate(
      base64Image,
      "Place this product on a wooden table with soft lighting"
    );

    console.log("\n✅ Process Complete!\n");
    console.log("📊 Image Analysis:\n", result.analysis);
    console.log("\n🖼️  New Image Path:\n", result.generatedImagePath);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
})();
