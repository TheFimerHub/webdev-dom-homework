export const baseUrl = 'https://wedev-api.sky.pro/api'

const token = localStorage.getItem('token');


export const getComments = () => {
    return fetch(`${baseUrl}/v2/michael-stepanov/comments`, {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export const postComment = (name, text) => {
    return fetch(`${baseUrl}/v2/michael-stepanov/comments`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            // forceError: true,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Слишком короткое имя или комментарий')
        }

        if (response.status >= 500) {
            throw new Error('Сервер решил отдохнуть')
        }
        return response
    })
}

export const login = ({ login, password }) => {
    return fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (response.status === 400) throw new Error('Неверный логин или пароль')
        return response.json()
    })
}
