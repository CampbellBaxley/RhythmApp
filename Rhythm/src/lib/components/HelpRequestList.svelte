<script>
    import HelpRequestItem from "./HelpRequestItem.svelte";
    
    // This would be replaced with actual data fetching logic
    let helpRequests = [
      { id: 1, title: "Need assistance with database query", requester: "John Doe", status: "pending" },
      { id: 2, title: "UI design feedback required", requester: "Jane Smith", status: "accepted" },
    ];
  </script>
  
  <div class="space-y-4">
    {#each helpRequests as request}
      <HelpRequestItem {request} />
    {/each}
  </div>
  
  