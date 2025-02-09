<script>
    export let project;
    
    function getUrgencyColor(urgency) {
      const colors = ["bg-green-500", "bg-yellow-500", "bg-orange-500", "bg-red-500", "bg-purple-500"];
      return colors[urgency - 1] || colors[0];
    }
  </script>
  
  <div class="bg-white shadow rounded-lg p-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg font-semibold">{project.title}</h3>
      <span class={`px-2 py-1 rounded-full text-xs text-white ${getUrgencyColor(project.urgency)}`}>
        Urgency: {project.urgency}
      </span>
    </div>
    <div class="mb-2">
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {project.status}%"></div>
      </div>
    </div>
    <div class="text-sm text-gray-600">Due: {project.dueDate}</div>
  </div>
  
  