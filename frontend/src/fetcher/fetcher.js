function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.status);
}

export function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: new Headers( {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response ? checkStatus(response) : response)
        .then((response) => response ? response.json() : {})
        .catch((error) => {
            throw error;
        });
}

export function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: new Headers( {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data || {})
    })
        .then((response) => response ? checkStatus(response) : response)
        .catch((error) => {
            throw error;
        });
}

export function deleteRequest(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers( {
            'Content-Type': 'application/json'
        })
    })
        .then((response) => checkStatus(response))
        .catch((error) => {
            throw error;
        });
}

export function put(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: new Headers( {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data || {})
    })
        .then((response) => checkStatus(response))
        .catch((error) => {
            throw error;
        });
}