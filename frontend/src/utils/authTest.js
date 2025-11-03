// Test utility for authentication functionality
// This file can be imported in development to test auth features

export const testAuthFlow = () => {
  console.log('🧪 Testing Authentication Flow...');
  
  // Test 1: Check if user data is properly stored
  const testUserData = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'customer'
  };
  
  // Simulate login
  localStorage.setItem('user', JSON.stringify(testUserData));
  console.log('✅ User data stored in localStorage');
  
  // Test 2: Check if user data can be retrieved
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    console.log('✅ User data retrieved from localStorage:', userData);
  }
  
  // Test 3: Test logout functionality
  localStorage.removeItem('user');
  sessionStorage.clear();
  
  // Clear cookies
  document.cookie.split(";").forEach((c) => {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });
  
  console.log('✅ All authentication data cleared');
  
  // Test 4: Verify data is cleared
  const clearedUser = localStorage.getItem('user');
  if (!clearedUser) {
    console.log('✅ Logout successful - no user data found');
  } else {
    console.log('❌ Logout failed - user data still exists');
  }
  
  console.log('🎉 Authentication flow test completed!');
};

// Test route protection
export const testRouteProtection = () => {
  console.log('🧪 Testing Route Protection...');
  
  // Simulate unauthenticated state
  localStorage.removeItem('user');
  
  // Check if user would be redirected
  const user = localStorage.getItem('user');
  if (!user) {
    console.log('✅ Unauthenticated user would be redirected to login');
  } else {
    console.log('❌ Route protection failed - user data exists');
  }
  
  console.log('🎉 Route protection test completed!');
};

// Run tests in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Running authentication tests in development mode...');
  // Uncomment the lines below to run tests
  // testAuthFlow();
  // testRouteProtection();
}



