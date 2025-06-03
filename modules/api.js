export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/michael-stepanov/comments', {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export const postComment = (name, text) => {
    return fetch('https://wedev-api.sky.pro/api/v1/michael-stepanov/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            // forceError: true,
        }),
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
