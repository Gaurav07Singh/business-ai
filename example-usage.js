import fs from "fs";
import { analyzeAndGenerate, analyzeImageFromFile, generateImage } from "./app/utils/aiService.js";

// ========================================
// Example 1: Analyze and Generate from Base64
// ========================================
async function example1() {
  console.log('\n📸 Example 1: Analyze and Generate from Base64\n');
  
  const base64Image = fs.readFileSync("input.jpg").toString("base64");
  
  const result = await analyzeAndGenerate(
    base64Image,
    "Place this product on a wooden table with soft lighting"
  );

  console.log("Image Analysis:\n", result.analysis);
  console.log("\nNew Image Path:\n", result.generatedImagePath);
}

// ========================================
// Example 2: Just Analyze an Image
// ========================================
async function example2() {
  console.log('\n🔍 Example 2: Just Analyze an Image\n');
  
  const analysis = await analyzeImageFromFile(
    "input.jpg",
    "Describe this image in detail"
  );
  
  console.log("Analysis Result:\n", analysis);
}

// ========================================
// Example 3: Just Generate an Image from Text
// ========================================
async function example3() {
  console.log('\n🎨 Example 3: Generate Image from Text Only\n');
  
  const imagePath = await generateImage(
    "A beautiful sunset over mountains with vibrant colors",
    "sunset_mountains.png"
  );
  
  console.log("Generated Image Saved to:", imagePath);
}

// ========================================
// Example 4: Multiple Transformations
// ========================================
async function example4() {
  console.log('\n🔄 Example 4: Multiple Transformations\n');
  
  const base64Image = fs.readFileSync("input.jpg").toString("base64");
  
  const prompts = [
    "Make it look like a watercolor painting",
    "Transform into a cyberpunk style with neon colors",
    "Place on a beach at sunset",
    "Make it look professional with studio lighting"
  ];
  
  for (let i = 0; i < prompts.length; i++) {
    console.log(`\nTransformation ${i + 1}: ${prompts[i]}`);
    
    const result = await analyzeAndGenerate(
      base64Image,
      prompts[i],
      `output_${i + 1}.png`
    );
    
    console.log(`✅ Saved to: ${result.generatedImagePath}`);
  }
}

// ========================================
// Run Examples
// ========================================
(async () => {
  try {
    // Uncomment the example you want to run:
    
    await example1();  // Main example: analyze and generate
    // await example2();  // Just analyze
    // await example3();  // Just generate from text
    // await example4();  // Multiple transformations
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
})();
