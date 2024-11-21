import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "https://admin.arcanoom.xyz",
  realm: "master",
  clientId: "multibanks_frontend",
});

export default keycloak;
