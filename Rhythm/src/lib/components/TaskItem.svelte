<script>
    export let task;
    
    function getUrgencyColor(urgency) {
      const colors = ["bg-green-500", "bg-yellow-500", "bg-orange-500", "bg-red-500", "bg-purple-500"];
      return colors[urgency - 1] || colors[0];
    }
  </script>
  
  <div class="bg-white shadow rounded-lg p-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg font-semibold">{task.title}</h3>
      <span class={`px-2 py-1 rounded-full text-xs text-white ${getUrgencyColor(task.urgency)}`}>
        Urgency: {task.urgency}
      </span>
    </div>
    <div class="mb-2">
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {task.status}%"></div>
      </div>
    </div>
    <div class="text-sm text-gray-600">Due: {task.dueDate}</div>
  </div>
  
  