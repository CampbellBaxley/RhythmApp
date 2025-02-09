<script>
    import '../app.css';
    import { onMount } from "svelte";
    import { createAuth } from "$lib/auth";

    // Declare reactive variables
    let user = null;
    let isAuthenticated = false;
    let auth;  // Declare auth here

    export let children; // Correct way to declare a prop

    onMount(async () => {
        auth = await createAuth(); // Initialize auth within onMount

        // Check authentication and get user (important to do this inside onMount)
        await checkAuth();
    });

    async function checkAuth() {
        isAuthenticated = await auth.isAuthenticated();
        if (isAuthenticated) {
            user = await auth.getUser();
        } else {
          user = null; // Important: Reset user if not authenticated
        }
    }

    async function login() {
        await auth.loginWithRedirect();
    }

    async function logout() {
        auth.logout({ logoutParams: { returnTo: window.location.origin } });
        // After logout, also update reactive variables
        await checkAuth(); // or set isAuthenticated = false; user = null;
    }
</script>

{@render children()}

{#if isAuthenticated}  <p>Welcome, {user ? user.name : "Guest"}!</p>
    <button on:click={logout}>Log out</button>
{:else}
    <button on:click={login}>Log in</button>
{/if}

