<script>
    let userName = "John Doe";
    let status = "In Office";
    let activeTab = "Tasks";
    let feeling = 75; // Percentage for the progress bar
    let tasks = [
      { name: "Complete project proposal", urgency: 4, dueDate: "2023-06-15" },
      { name: "Review code changes", urgency: 3, dueDate: "2023-06-14" },
      { name: "Update documentation", urgency: 2, dueDate: "2023-06-18" },
      { name: "Team meeting", urgency: 5, dueDate: "2023-06-13" },
    ];
  
    function setActiveTab(tab) {
      activeTab = tab;
    }
  
    // Function to get feeling description
    function getFeelingDescription(feeling) {
      if (feeling >= 80) return "Excellent";
      if (feeling >= 60) return "Good";
      if (feeling >= 40) return "Okay";
      if (feeling >= 20) return "Not great";
      return "Poor";
    }
  </script>
  
  <div class="container mx-auto p-4">
    <header class="grid grid-cols-3 items-center mb-4">
      <h1 class="text-2xl font-bold">Welcome, {userName}</h1>
      <div class="text-lg font-semibold text-center">
        Status: <span class="text-green-600">{status}</span>
      </div>
      <div class="flex items-center justify-end">
        <span class="mr-2">Feeling:</span>
        <div class="w-32 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div class="bg-blue-600 h-4 rounded-full" style="width: {feeling}%"></div>
        </div>
      </div>
    </header>
    
    <div class="mb-4">
      <div class="flex border-b">
        {#each ["Tasks", "Status", "Co-workers", "Requests"] as tab}
          <button
            class="py-2 px-4 {activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}"
            on:click={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        {/each}
      </div>
      
      <div class="p-4 border-l border-r border-b">
        {#if activeTab === "Tasks"}
          <table class="w-full">
            <thead>
              <tr>
                <th class="text-left">Task</th>
                <th class="text-center">Urgency</th>
                <th class="text-right">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {#each tasks as task}
                <tr>
                  <td>{task.name}</td>
                  <td class="text-center">{task.urgency}</td>
                  <td class="text-right">{task.dueDate}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else if activeTab === "Status"}
          <div class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-2">Current Status</h2>
              <p class="text-lg">
                Your current status is: <span class="font-bold text-green-600">{status}</span>
              </p>
              <p class="text-sm text-gray-600 mt-1">
                This status indicates your availability to your team members. You can update it anytime.
              </p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold mb-2">Feeling</h2>
              <div class="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700 mb-2">
                <div class="bg-blue-600 h-6 rounded-full" style="width: {feeling}%"></div>
              </div>
              <p class="text-lg">
                Your current feeling: <span class="font-bold">{getFeelingDescription(feeling)}</span> ({feeling}%)
              </p>
              <p class="text-sm text-gray-600 mt-1">
                This progress bar represents your overall feeling or mood. It can help your team understand your current state and productivity level.
              </p>
            </div>
          </div>
        {:else}
          <p>Content for {activeTab} tab</p>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    /* Any additional custom styles can be added here */
  </style>
  