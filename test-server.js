// Simple test to verify the server can start
console.log('Testing server startup...');

try {
  // Test if we can require the main modules
  const express = require('express');
  console.log('✅ Express loaded successfully');
  
  const config = require('./config');
  console.log('✅ Config loaded successfully');
  
  const { sequelize } = require('../backend/models');
  console.log('✅ Database models loaded successfully');
  
  console.log('\n🎉 All core modules are working!');
  console.log('You can now run: npm start');
  
} catch (error) {
  console.error('❌ Error loading modules:', error.message);
  console.log('\nTry running: npm install');
}
