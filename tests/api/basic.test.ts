// Simple API test script
const BASE_URL = 'http://localhost:3000/api';

async function testApiEndpoint(url: string, options: RequestInit) {
  try {
    console.log(`Testing ${options.method || 'GET'} ${url}`);
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
    console.log('---');
    
    return { status: response.status, data };
  } catch (error) {
    console.error(`Error testing ${url}:`, error);
    return { status: 0, error };
  }
}

// Test registration
async function testRegistration() {
  console.log('=== Testing Registration ===');
  await testApiEndpoint('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      cosplayerName: 'Test Cosplayer'
    }),
  });
}

// Test login
async function testLogin() {
  console.log('=== Testing Login ===');
  const result = await testApiEndpoint('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    }),
  });
  
  return result.data?.token;
}

// Test user profile
async function testUserProfile(token: string) {
  console.log('=== Testing User Profile ===');
  await testApiEndpoint('/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

// Test follow/unfollow
async function testFollowUnfollow(token: string) {
  console.log('=== Testing Follow/Unfollow ===');
  // This would require a valid user ID to follow
  console.log('Follow/unfollow tests require a valid user ID to target');
}

async function runTests() {
  console.log('Starting API tests...\n');
  
  // Test registration
  await testRegistration();
  
  // Test login
  const token = await testLogin();
  
  // Test user profile (if login was successful)
  if (token) {
    await testUserProfile(token);
  }
  
  console.log('API tests completed.');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export { testApiEndpoint, testRegistration, testLogin, testUserProfile, testFollowUnfollow };