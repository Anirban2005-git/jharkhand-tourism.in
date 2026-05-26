// Final test to verify ES modules are working
console.log('🧪 Testing ES modules...');

try {
  // Test basic imports
  console.log('1. Testing express import...');
  const express = await import('express');
  console.log('✅ Express imported successfully');

  console.log('2. Testing config import...');
  const config = await import('./config.js');
  console.log('✅ Config imported successfully:', config.default);

  console.log('3. Testing models import...');
  const models = await import('../backend/models/index.js');
  console.log('✅ Models imported successfully');

  console.log('\n🎉 All ES module imports are working correctly!');
  console.log('Your server should now start without issues.');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
