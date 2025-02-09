<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
  
    $: isLoginPage = $page.url.pathname === "/";
  
    let error = null;
  
    onMount(() => {
      window.onerror = (message, source, lineno, colno, err) => {
        console.error('Caught error:', err);
        error = err.toString();
      };
    });
  </script>
  
  {#if error}
    <div class="error">
      <h1>An error occurred</h1>
      <pre>{error}</pre>
    </div>
  {:else}
    <div class="min-h-screen bg-blue-50">
      {#if !isLoginPage}
        <nav class="bg-blue-600 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/dashboard" class="text-2xl font-bold">Rhythm</a>
            <div class="space-x-4">
              <a href="/dashboard" class:active={$page.url.pathname === "/dashboard"}>Dashboard</a>
              <a href="/tasks" class:active={$page.url.pathname === "/tasks"}>Tasks</a>
              <a href="/projects" class:active={$page.url.pathname === "/projects"}>Projects</a>
              <a href="/help-requests" class:active={$page.url.pathname === "/help-requests"}>Help Requests</a>
            </div>
          </div>
        </nav>
      {/if}
      
      <main class="container mx-auto p-4">
        {#if !isLoginPage && $page.data.user}
          <div class="mb-6">
            <h1 class="text-2xl font-bold">Hello, {$page.data.user.name}</h1>
          </div>
        {/if}
        <slot />
      </main>
    </div>
  {/if}
  
  <style>
    .active {
      font-weight: bold;
      text-decoration: underline;
    }
    .error {
      color: red;
      padding: 20px;
    }
  </style>
  
  