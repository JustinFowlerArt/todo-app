import "whatwg-fetch";
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

function fetchData(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function deleteData(url) {
    const request = new Request(baseUrl + url, {
        method: 'DELETE'
    });

    return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}


export function getUsers() {
    return fetchData("users");
}

export function deleteUser(id) {
    return deleteData(`users/${id}`);
}