<script>
    export let request;
    
    function handleAccept() {
      // Logic to accept the help request
      console.log("Accepted request:", request.id);
    }
    
    function handleDecline() {
      // Logic to decline the help request
      console.log("Declined request:", request.id);
    }
  </script>
  
  <div class="bg-white shadow rounded-lg p-4">
    <h3 class="text-lg font-semibold mb-2">{request.title}</h3>
    <p class="text-sm text-gray-600 mb-2">Requested by: {request.requester}</p>
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium {request.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}">
        Status: {request.status}
      </span>
      {#if request.status === 'pending'}
        <div class="space-x-2">
          <button on:click={handleAccept} class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
            Accept
          </button>
          <button on:click={handleDecline} class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Decline
          </button>
        </div>
      {/if}
    </div>
  </div>
  
  