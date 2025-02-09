<script>
    import TaskItem from "./TaskItem.svelte";
    
    // This would be replaced with actual data fetching logic
    let tasks = [
      { id: 1, title: "Complete project proposal", status: 50, urgency: 4, dueDate: "2023-06-30" },
      { id: 2, title: "Review code changes", status: 25, urgency: 3, dueDate: "2023-06-25" },
      { id: 3, title: "Update documentation", status: 75, urgency: 2, dueDate: "2023-07-05" },
    ];
  </script>
  
  <div class="space-y-4">
    {#each tasks as task}
      <TaskItem {task} />
    {/each}
  </div>
  
  