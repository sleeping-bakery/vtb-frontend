import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "master",
  clientId: "multibanks-frontend",
});

export default keycloak;
