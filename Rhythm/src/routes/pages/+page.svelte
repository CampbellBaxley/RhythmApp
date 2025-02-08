<script lang="ts">
    interface Task {
      name: string;
      urgency: number;
      dueDate: string;
      progress: number;
    }
  
    interface TeamMember {
      name: string;
      role: string;
      feeling: number;
      tasks: Task[];
    }
  
    let userName = "Ethan Scott";
    let status = "In Office";
    let activeTab = "Tasks";
    let feeling = 75;
    
    let tasks: Task[] = [
      { name: "Complete project proposal", urgency: 4, dueDate: "2023-06-15", progress: 60 },
      { name: "Review code changes", urgency: 3, dueDate: "2023-06-14", progress: 30 },
      { name: "Update documentation", urgency: 2, dueDate: "2023-06-18", progress: 0 },
      { name: "Team meeting", urgency: 5, dueDate: "2023-06-13", progress: 100 },
    ];
  
    let teamMembers: TeamMember[] = [
      {
        name: "Sarah Johnson",
        role: "Manager",
        feeling: 85,
        tasks: [
          { name: "Quarterly Planning", urgency: 5, dueDate: "2023-06-20", progress: 70 },
          { name: "Team Reviews", urgency: 4, dueDate: "2023-06-25", progress: 30 },
        ]
      },
      {
        name: "Mike Chen",
        role: "Co-worker",
        feeling: 65,
        tasks: [
          { name: "API Integration", urgency: 4, dueDate: "2023-06-16", progress: 45 },
          { name: "Bug Fixes", urgency: 3, dueDate: "2023-06-14", progress: 90 },
        ]
      },
      {
        name: "Emma Davis",
        role: "Co-worker",
        feeling: 90,
        tasks: [
          { name: "UI Components", urgency: 4, dueDate: "2023-06-17", progress: 85 },
          { name: "User Testing", urgency: 3, dueDate: "2023-06-19", progress: 20 },
        ]
      }
    ];
  
    function getFeelingDescription(feeling: number): string {
      if (feeling >= 80) return "Excellent";
      if (feeling >= 60) return "Good";
      if (feeling >= 40) return "Okay";
      if (feeling >= 20) return "Not great";
      return "Poor";
    }
  
    let expandedMember: string | null = null;
  
    function toggleMember(name: string) {
      expandedMember = expandedMember === name ? null : name;
    }
  </script>
  
  <div class="container">
    <header class="header">
      <h1>Welcome, {userName}</h1>
      <div>
        Status: <span class="status">{status}</span>
      </div>
      <div>
        <span>Productivity/Feeling:</span>
        <progress value={feeling} max="100"></progress>
      </div>
    </header>
  
    <div class="card">
      <div class="tabs">
        {#each ["Tasks", "Status", "Co-workers", "Requests"] as tab}
          <button
            class:active={activeTab === tab}
            on:click={() => activeTab = tab}
          >
            {tab}
          </button>
        {/each}
      </div>
  
      <div class="content">
        {#if activeTab === "Tasks"}
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Urgency</th>
                <th>Due Date</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {#each tasks as task}
                <tr>
                  <td>{task.name}</td>
                  <td>{task.urgency}</td>
                  <td>{task.dueDate}</td>
                  <td><progress value={task.progress} max="100"></progress></td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else if activeTab === "Status"}
          <div class="status-content">
            <div>
              <h2>Current Status</h2>
              <p>
                Your current status is: <span class="status">{status}</span>
              </p>
              <p class="description">
                This status indicates your availability to your team members. You can update it anytime.
              </p>
            </div>
            
            <div>
              <h2>Productivity/Feeling</h2>
              <progress value={feeling} max="100"></progress>
              <p>
                Your current feeling: <span class="feeling">{getFeelingDescription(feeling)}</span> ({feeling}%)
              </p>
              <p class="description">
                This progress bar represents your overall feeling or mood. It can help your team understand your current state and productivity level.
              </p>
            </div>
          </div>
        {:else if activeTab === "Co-workers"}
          <div class="co-workers">
            {#each teamMembers as member}
              <div class="member-card">
                <div class="member-header" on:click={() => toggleMember(member.name)}>
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                  <div>
                    <span>Feeling:</span>
                    <progress value={member.feeling} max="100"></progress>
                    <span>{getFeelingDescription(member.feeling)}</span>
                  </div>
                </div>
                {#if expandedMember === member.name}
                  <table>
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Urgency</th>
                        <th>Due Date</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each member.tasks as task}
                        <tr>
                          <td>{task.name}</td>
                          <td>{task.urgency}</td>
                          <td>{task.dueDate}</td>
                          <td><progress value={task.progress} max="100"></progress></td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                {/if}
              </div>
            {/each}
          </div>
        {:else if activeTab === "Requests"}
          <p>Content for Requests tab</p>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      margin-bottom: 1rem;
    }
  
    .status {
      color: green;
      font-weight: bold;
    }
  
    .card {
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }
  
    .tabs {
      display: flex;
      border-bottom: 1px solid #ccc;
    }
  
    .tabs button {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      cursor: pointer;
    }
  
    .tabs button.active {
      background-color: #f0f0f0;
    }
  
    .content {
      padding: 1rem;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      text-align: left;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
    }
  
    .status-content {
      display: grid;
      gap: 1rem;
    }
  
    .description {
      font-size: 0.9rem;
      color: #666;
    }
  
    .co-workers {
      display: grid;
      gap: 1rem;
    }
  
    .member-card {
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }
  
    .member-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #f0f0f0;
      cursor: pointer;
    }
  
    progress {
      width: 100px;
    }
  
    .feeling {
      font-weight: bold;
    }
  </style>
  
  