<script>
    import { goto } from '$app/navigation';
    
    let username = '';
    let password = '';
    let email = '';
    let error = '';
    let isRegistering = false;
  
    async function handleSubmit() {
      try {
        const endpoint = isRegistering ? '/api/register' : '/api/login';
        const body = isRegistering ? { username, password, email } : { username, password };
  
        console.log(`Submitting to ${endpoint}`, body);
  
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        const data = await response.json();
        console.log('Response:', data);
  
        if (response.ok) {
          if (data.success) {
            console.log('Redirecting to dashboard');
            goto('/dashboard');
          } else {
            error = data.message || 'An unexpected error occurred';
          }
        } else {
          if (data.message === 'User not found' && !isRegistering) {
            error = 'User not found. Would you like to register?';
          } else {
            error = data.message || 'An error occurred';
          }
        }
      } catch (err) {
        console.error('Error:', err);
        error = 'An error occurred while processing your request';
      }
    }
  
    function toggleMode() {
      isRegistering = !isRegistering;
      error = '';
    }
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">Welcome to Rhythm</h1>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            bind:value={username}
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {#if isRegistering}
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        {/if}
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {#if error}
          <p class="text-red-500 text-sm">{error}</p>
        {/if}
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isRegistering ? 'Register' : 'Log in'}
        </button>
      </form>
      <div class="mt-4 text-center">
        <button on:click={toggleMode} class="text-blue-600 hover:underline">
          {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  </div>
  
  