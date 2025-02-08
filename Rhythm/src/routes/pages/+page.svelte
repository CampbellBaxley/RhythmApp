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
                <button on:click={() => handleRequest(request, 'accept')} class="accept">Accept</button>
                <button on:click={() => handleRequest(request, 'decline')} class="decline">Decline</button>
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
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f6f8;
    color: #333;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    color: #2c3e50;
  }

  .status-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #16a085;
  }

  .status {
    color: #27ae60;
    font-weight: bold;
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    background-color: #ecf0f1;
  }

  .tabs button {
    flex: 1;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.3s;
  }

  .tabs button:hover {
    background-color: #bdc3c7;
  }

  .tabs button.active {
    background-color: #95a5a6;
    color: #ffffff;
    font-weight: bold;
  }

  .content {
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Roboto', sans-serif;
  }

  th, td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 1px solid #ccc;
  }

  th {
    font-family: 'Montserrat', sans-serif;
    background-color: #ecf0f1;
  }

  .status-content {
    display: grid;
    gap: 1rem;
  }

  .description {
    font-size: 0.9rem;
    color: #666;
  }

  .progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
    margin-bottom: 0.5rem;
  }

  .progress-bar {
    height: 100%;
    background-color: #3498db;
  }

  .co-workers {
    display: grid;
    gap: 1rem;
  }

  .member-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .member-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #ecf0f1;
    cursor: pointer;
  }

  .member-header h3 {
    font-family: 'Montserrat', sans-serif;
  }

  .feeling-container {
    display: flex;
    align-items: center;
  }

  progress {
    width: 100px;
    margin-left: 0.5rem;
  }

  .requests {
    display: grid;
    gap: 1rem;
  }

  .request-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 1rem;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .request-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .request-actions button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Roboto', sans-serif;
  }

  .request-actions button.accept {
    background-color: #4caf50;
    color: white;
  }

  .request-actions button.decline {
    background-color: #f44336;
    color: white;
  }

  .request-actions button:hover {
    opacity: 0.8;
  }
</style>



<!-- ... adding auth-0 test --> 



