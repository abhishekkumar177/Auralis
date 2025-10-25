// Quick test script to check Gemini API and list available models
require('dotenv').config({ path: '.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  process.exit(1);
}

console.log('✓ API Key found:', apiKey.substring(0, 10) + '...');

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  const modelsToTest = [
    'gemini-2.5-flash',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
  ];

  console.log('\n🧪 Testing different model names...\n');

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "hello" in one word.');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} works! Response: ${text.trim()}`);
      console.log('   👉 Use this model in your app!\n');
      break; // Found a working model, stop testing
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message.split('\n')[0]}\n`);
    }
  }
}

testModels().catch(console.error);
