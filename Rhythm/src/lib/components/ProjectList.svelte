<script>
    import ProjectItem from "./ProjectItem.svelte";
    
    // This would be replaced with actual data fetching logic
    let projects = [
      { id: 1, title: "Website Redesign", status: 30, urgency: 3, dueDate: "2023-08-15" },
      { id: 2, title: "Mobile App Development", status: 60, urgency: 4, dueDate: "2023-09-30" },
    ];
  </script>
  
  <div class="space-y-4">
    {#each projects as project}
      <ProjectItem {project} />
    {/each}
  </div>
  
  