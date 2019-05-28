export function getRequestInJSON(url) {
  return fetch(url).then(response => response.json());
}
