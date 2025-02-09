<script>
    import { onMount } from "svelte";
    import { createAuth } from "$lib/auth";
    import { goto } from "$app/navigation";
  
    onMount(async () => {
      const auth = await createAuth();
      await auth.handleRedirectCallback();
      goto("/");
    });
  </script>
  
  <p>Logging in...</p>
  