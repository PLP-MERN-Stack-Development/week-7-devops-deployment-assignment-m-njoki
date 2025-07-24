#!/usr/bin/env node

const axios = require('axios');
const logger = require('../src/utils/logger');

const API_URL = process.env.API_URL || 'http://localhost:5000';

async function performHealthCheck() {
  try {
    console.log('🔍 Starting health check...');
    
    // Test health endpoint
    const healthResponse = await axios.get(`${API_URL}/health`, {
      timeout: 5000
    });
    
    if (healthResponse.status === 200) {
      console.log('✅ Health check passed');
      console.log('📊 Health data:', JSON.stringify(healthResponse.data, null, 2));
    } else {
      throw new Error(`Health check failed with status: ${healthResponse.status}`);
    }
    
    // Test API status endpoint
    const statusResponse = await axios.get(`${API_URL}/api/status`, {
      timeout: 5000
    });
    
    if (statusResponse.status === 200) {
      console.log('✅ API status check passed');
      console.log('📊 API status:', JSON.stringify(statusResponse.data, null, 2));
    } else {
      throw new Error(`API status check failed with status: ${statusResponse.status}`);
    }
    
    // Test basic API endpoints
    console.log('🧪 Testing API endpoints...');
    
    // Test user endpoints (should return 401 without auth)
    try {
      await axios.get(`${API_URL}/api/users/profile`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Authentication protection working');
      } else {
        throw error;
      }
    }
    
    console.log('🎉 All health checks passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    logger.error('Health check failed', { error: error.message });
    process.exit(1);
  }
}

// Performance check
async function performanceCheck() {
  try {
    console.log('⚡ Starting performance check...');
    
    const start = Date.now();
    await axios.get(`${API_URL}/health`);
    const responseTime = Date.now() - start;
    
    console.log(`📈 Response time: ${responseTime}ms`);
    
    if (responseTime > 2000) {
      console.warn('⚠️  Slow response time detected');
    } else {
      console.log('✅ Response time acceptable');
    }
    
  } catch (error) {
    console.error('❌ Performance check failed:', error.message);
  }
}

// Main execution
async function main() {
  console.log(`🚀 Running health check for: ${API_URL}`);
  console.log('='*50);
  
  await performHealthCheck();
  await performanceCheck();
}

if (require.main === module) {
  main();
}

module.exports = { performHealthCheck, performanceCheck };
