import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client; // Keep this as a module-level variable

async function createAuth() { // Renamed to createAuth, now a factory function
  if (!auth0Client) { // Initialize only once
    auth0Client = await createAuth0Client({
      domain: "dev-ba4xpno4nqxzrx06.us.auth0.com",
      client_id: "UaM7904XjxEmJjprKJe38wq7x8ge3NF6",
    });
  }
  return auth0Client; // Return the *same* instance every time
}


async function login() {
  const authClient = await createAuth(); // Get the instance
  await authClient.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

async function handleRedirectCallback() {
  const authClient = await createAuth();
  const result = await authClient.handleRedirectCallback();
  return result;
}

async function logout() {
  const authClient = await createAuth();
  authClient.logout({
    returnTo: window.location.origin,
  });
}

async function isAuthenticated() {
  const authClient = await createAuth();
  return await authClient.isAuthenticated();
}

async function getUser() {
  const authClient = await createAuth();
  return await authClient.getUser();
}

export { createAuth, login, logout, isAuthenticated, getUser, handleRedirectCallback }; // Export createAuth