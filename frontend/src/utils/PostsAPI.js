
import { api, headers} from './Api'


export const get = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())


export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)


export const searchPostsByCategory = (category) => {
    let url = `${api}/${category}/posts`
    return fetch(url, { headers })
        .then(res => res.json())
        .then(data => data)
}

export const create = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())


export const update = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())


export const remove = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())


export const search = (query, maxResults) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, maxResults })
    }).then(res => res.json())
        .then(data => data.posts)


export const vote = (post, vote) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: vote})
    }).then(res => res.json())