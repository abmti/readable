
import { api, headers} from './Api'


export const searchByPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)


export const create = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())


export const update = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())


export const remove = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())


export const vote = (comment, vote) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: vote})
    }).then(res => res.json())

