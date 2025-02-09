<script>
    import { page } from '$app/stores';
  </script>
  
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
  
  <p>Welcome to your dashboard!</p>
  
  {#if $page.data.user}
    <p>Logged in as: {$page.data.user.name}</p>
  {/if}
  
  