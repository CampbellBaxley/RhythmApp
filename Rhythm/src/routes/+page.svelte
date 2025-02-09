<script>
    import TaskList from "$lib/components/TaskList.svelte";
    import ProjectList from "$lib/components/ProjectList.svelte";
  </script>
  
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Your Tasks</h2>
      <TaskList />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Your Projects</h2>
      <ProjectList />
    </div>
  </div>
  
  