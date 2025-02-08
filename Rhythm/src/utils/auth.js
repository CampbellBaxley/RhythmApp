import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client;

async function initAuth0() {
  auth0Client = await createAuth0Client({
    domain: "dev-ba4xpno4nqxzrx06.us.auth0.com", // Replace with your Auth0 domain
    client_id: "UaM7904XjxEmJjprKJe38wq7x8ge3NF6", // Replace with your Client ID
  });
}

async function login() {
  await auth0Client.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

async function handleRedirectCallback() {
  const result = await auth0Client.handleRedirectCallback();
  return result;
}

async function logout() {
  auth0Client.logout({
    returnTo: window.location.origin,
  });
}

async function isAuthenticated() {
  return await auth0Client.isAuthenticated();
}

async function getUser() {
  return await auth0Client.getUser();
}

export { initAuth0, login, logout, isAuthenticated, getUser, handleRedirectCallback };
