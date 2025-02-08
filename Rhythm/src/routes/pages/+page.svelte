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

    function findTask(memberName: string, taskName: string): Task | undefined {
      const member = teamMembers.find(m => m.name === memberName);
      return member?.tasks.find(t => t.name === taskName);
    }

    function copyTask(task: Task): Task {
      return { ...task };
    }

    function canHandleRequest(request: Request): boolean {
      if (request.type === 'trade') {
        return request.to === userName;
      }
      return true;
    }

    function handleRequest(request: Request, action: 'accept' | 'decline') {
      // Check if user can handle this request
      if (request.type === 'trade' && request.to !== userName) {
        alert("You cannot handle this trade request as it's not directed to you.");
        return;
      }

      if (action === 'decline') {
        requests = requests.filter(r => r !== request);
        return;
      }

      if (request.type === 'help') {
        // Find the requesting member
        const fromMember = teamMembers.find(m => m.name === request.from);
        if (fromMember) {
          // Add a copy of the task to their tasks
          teamMembers = teamMembers.map(member => {
            if (member.name === request.from) {
              const task = findTask(request.from, request.task);
              if (task) {
                return {
                  ...member,
                  tasks: [...member.tasks]
                };
              }
            }
            return member;
          });
        }
      } else if (request.type === 'trade' && request.to === userName && request.tradeTask) {
        // Handle trade only if it's directed to the current user
        const fromTask = findTask(request.from, request.task);
        const toTask = findTask(request.to, request.tradeTask);

        if (fromTask && toTask) {
          // Find the team members
          const fromMember = teamMembers.find(m => m.name === request.from);
          const toMember = teamMembers.find(m => m.name === request.to);

          if (fromMember && toMember) {
            // Update the team members' tasks
            teamMembers = teamMembers.map(member => {
              if (member.name === request.from) {
                return {
                  ...member,
                  tasks: member.tasks.map(t => 
                    t.name === request.task ? copyTask(toTask) : t
                  )
                };
              }
              if (member.name === request.to) {
                return {
                  ...member,
                  tasks: member.tasks.map(t =>
                    t.name === request.tradeTask ? copyTask(fromTask) : t
                  )
                };
              }
              return member;
            });
          }
        }
      }

      // Remove the processed request
      requests = requests.filter(r => r !== request);
      alert(`Request ${action}ed and tasks updated`);
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
            <h2 class="text-xl font-semibold mb-2">Current Status</h2>
            <p class="text-lg">
              Your current status is: <span class="font-bold text-green-600">{status}</span>
            </p>
            <p class="text-sm text-gray-600 mt-1">
              This status indicates your availability to your team members. You can update it anytime.
            </p>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold mb-2">Productivity/Feeling</h2>
            <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-2">
              <div class="bg-blue-600 h-4 rounded-full" style="width: {feeling}%"></div>
            </div>
            <p class="text-lg">
              Your current feeling: <span class="font-bold">{getFeelingDescription(feeling)}</span> ({feeling}%)
            </p>
            <p class="text-sm text-gray-600 mt-1">
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
        <div class="requests">
          {#each requests as request}
            <div class="request-card">
              {#if request.type === 'help'}
                <p><strong>{request.from}</strong> is requesting help with the task: <strong>{request.task}</strong></p>
              {:else if request.type === 'trade'}
                <p><strong>{request.from}</strong> wants to trade the task <strong>{request.task}</strong> with <strong>{request.to}</strong>'s task <strong>{request.tradeTask}</strong></p>
              {/if}
              <div class="request-actions">
                {#if canHandleRequest(request)}
                  <button on:click={() => handleRequest(request, 'accept')} class="accept">Accept</button>
                  <button on:click={() => handleRequest(request, 'decline')} class="decline">Decline</button>
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

  .requests {
    display: grid;
    gap: 1rem;
  }

  .request-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    background-color: #f9f9f9;
  }

  .request-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .request-actions button {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .request-actions button.accept {
    background-color: #4caf50;
    color: white;
  }

  .request-actions button.decline {
    background-color: #f44336;
    color: white;
  }
</style>