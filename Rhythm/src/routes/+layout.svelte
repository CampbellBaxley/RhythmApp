<script>
    import "../app.css";
    import { page } from "$app/stores";
  </script>
  
  <div class="min-h-screen bg-blue-50">
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-2xl font-bold">Rhythm</a>
        <div class="space-x-4">
          <a href="/" class:active={$page.url.pathname === "/"}>Dashboard</a>
          <a href="/tasks" class:active={$page.url.pathname === "/tasks"}>Tasks</a>
          <a href="/projects" class:active={$page.url.pathname === "/projects"}>Projects</a>
          <a href="/help-requests" class:active={$page.url.pathname === "/help-requests"}>Help Requests</a>
        </div>
      </div>
    </nav>
    
    <main class="container mx-auto p-4">
      <div class="mb-6">
        {#if $page.data.user}
          <h1 class="text-2xl font-bold">Hello, {$page.data.user.name}</h1>
        {/if}
      </div>
      <slot />
    </main>
  </div>
  
  <style>
    .active {
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
  
  