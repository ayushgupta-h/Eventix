// Quick MongoDB Connection Test
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
console.log('\nAttempting to connect...\n');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ SUCCESS! MongoDB Connected!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    console.log('\n🎉 Your MongoDB is working! You can now run the app.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ CONNECTION FAILED!');
    console.log('\nError:', error.message);
    console.log('\n📋 Possible Solutions:');
    console.log('1. Go to MongoDB Atlas → Network Access');
    console.log('2. Click "ADD IP ADDRESS"');
    console.log('3. Click "ALLOW ACCESS FROM ANYWHERE"');
    console.log('4. Wait 2-3 minutes and try again');
    console.log('\nOr check MONGODB_FIX.md for detailed instructions.');
    process.exit(1);
  });
