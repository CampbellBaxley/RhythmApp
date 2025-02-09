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

  interface Request {
    type: 'help' | 'trade';
    from: string;
    task: string;
    to?: string;
    tradeTask?: string;
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
      name: "Campbell Baxley",
      role: "Manager",
      feeling: 85,
      tasks: [
        { name: "Quarterly Planning", urgency: 5, dueDate: "2023-06-20", progress: 70 },
        { name: "Team Reviews", urgency: 4, dueDate: "2023-06-25", progress: 30 },
      ]
    },
    {
      name: "Abi Clark",
      role: "Co-worker",
      feeling: 65,
      tasks: [
        { name: "API Integration", urgency: 4, dueDate: "2023-06-16", progress: 45 },
        { name: "Bug Fixes", urgency: 3, dueDate: "2023-06-14", progress: 90 },
      ]
    },
    {
      name: "Drew Wentworth",
      role: "Co-worker",
      feeling: 90,
      tasks: [
        { name: "UI Components", urgency: 4, dueDate: "2023-06-17", progress: 85 },
        { name: "User Testing", urgency: 3, dueDate: "2023-06-19", progress: 20 },
      ]
    }
  ];

  let requests: Request[] = [
    { type: 'help', from: 'Abi Clark', task: 'API Integration' },
    { type: 'trade', from: 'Drew Wentworth', task: 'User Testing', to: 'Abi Clark', tradeTask: 'Bug Fixes' },
    { type: 'help', from: 'Campbell Baxley', task: 'Team Reviews' },
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

  function handleRequest(request: Request, action: 'accept' | 'decline') {
    if (request.type === 'trade') {
      if (userName !== request.from && userName !== request.to) {
        alert("You are not involved in this trade and cannot accept or decline it.");
        return;
      }
    }
    // In a real application, you would handle the request here
    // For now, we'll just remove the request from the list
    requests = requests.filter(r => r !== request);
    alert(`Request ${action}ed`);
  }
</script>

<div class="container">
  <header class="header">
    <h1>{userName}, Welcome to Rhythm</h1>
    <div class="status-container">
      <span>Status: <span class="status">{status}</span></span>
      <span>Productivity/Feeling: <progress value={feeling} max="100"></progress></span>
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
              Your current status is: <span class="font-bold text-green-600">{status}</span>
            </p>
            <p class="description">
              This status indicates your availability to your team members. You can update it anytime.
            </p>
          </div>

          <div>
            <h2>Productivity/Feeling</h2>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: {feeling}%"></div>
            </div>
            <p>
              Your current feeling: <span class="font-bold">{getFeelingDescription(feeling)}</span> ({feeling}%)
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
                <div class="feeling-container">
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
        <div class="requests">
          {#each requests as request}
            <div class="request-card">
              {#if request.type === 'help'}
                <p><strong>{request.from}</strong> is requesting help with the task: <strong>{request.task}</strong></p>
              {:else if request.type === 'trade'}
                <p><strong>{request.from}</strong> wants to trade the task <strong>{request.task}</strong> with <strong>{request.to}</strong>'s task <strong>{request.tradeTask}</strong></p>
              {/if}
              <div class="request-actions">
                {#if request.type === 'help' || (request.type === 'trade' && (userName === request.from || userName === request.to))}
                  <button on:click={() => handleRequest(request, 'accept')} class="accept">Accept</button>
                  <button on:click={() => handleRequest(request, 'decline')} class="decline">Decline</button>
                {:else}
                  <p>You are not involved in this trade.</p>
                {/if}
              </div>
            </div>
          {/each}
          {#if requests.length === 0}
            <p>No pending requests.</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
  }

  .header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    width: 80%;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    margin: 0;
  }

  .status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .status {
    font-weight: bold;
    color: #00b050;
  }

  .card {
    background-color: #fff;
    padding: 20px;
    width: 80%;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .tabs {
    display: flex;
    margin-bottom: 20px;
  }

  .tabs button {
    background-color: #eee;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .tabs button.active {
    background-color: #333;
    color: #fff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  progress {
    width: 100px;
    height: 20px;
  }

  .status-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .progress-bar-container {
    width: 200px;
    height: 20px;
    background-color: #eee;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .progress-bar {
    height: 100%;
    background-color: #00b050;
    border-radius: 5px;
  }

  .co-workers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .member-card {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    width: 48%;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .member-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .feeling-container {
    display: flex;
    align-items: center;
  }

  .requests {
    display: flex;
    flex-direction: column;
  }

  .request-card {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .request-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }

  .accept {
    background-color: #00b050;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .decline {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .font-bold {
    font-weight: bold;
  }

  .text-green-600 {
    color: #22c55e;
  } 

</style>
