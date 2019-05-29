import { getRequestInJSON } from "./request.js";

let heroApiUrl = "https://api.opendota.com/api/heroStats";
let itemsUrl = "https://api.opendota.com/api/scenarios/itemTimings?hero_id=";
let matchUrl = "https://api.opendota.com/api/heroes/";
let laneRoleUrl = "https://api.opendota.com/api/scenarios/laneRoles?hero_id=";

export function getHeroes() {
  return getRequestInJSON(heroApiUrl);
}

export function getItems(heroid) {
  return getRequestInJSON(itemsUrl + heroid);
}

export function getMatchups(heroid) {
  return getRequestInJSON(matchUrl + heroid + "/matchups");
}

export function getMatches(heroid) {
  return getRequestInJSON(matchUrl + heroid + "/matches");
}

export function getLaneRole(heroid) {
  return getRequestInJSON(laneRoleUrl + heroid);
}
