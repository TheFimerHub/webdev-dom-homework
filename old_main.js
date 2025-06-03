const commentsEl = document.querySelector('.comments')
const btnEl = document.querySelector('.add-form-button')
const inputNameEl = document.querySelector('.add-form-name')
const inputTextEl = document.querySelector('.add-form-text')
const loadingCommentsEl = document.querySelector('.loading')
const loadingTextEl = document.querySelector('.loading__text')

const textProcessing = (text) => {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

function formatDateTime(dateInput) {
    const date = new Date(dateInput)

    const formatTime = (n) => n.toString().padStart(2, '0')

    const day = formatTime(date.getDate())
    const month = formatTime(date.getMonth() + 1) // месяцы с 0
    const year = date.getFullYear().toString().slice(-2)
    const hours = formatTime(date.getHours())
    const minutes = formatTime(date.getMinutes())

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

let localComments = []

// Рендер для комментариев
const renderComments = () => {
    commentsEl.innerHTML = ''

    localComments.forEach((comment) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `
                        <div class="comment-header">
                                <div>${comment.author.name}</div>
                                <div>${formatDateTime(comment.date)}</div>
                        </div>
                        <div class="comment-body">
                                <div class="comment-text">
                                        ${comment.text}
                                </div>
                        </div>
                        <div class="comment-footer">
                                <div class="likes">
                                        <span class="likes-counter">${comment.likes}</span>
                                        <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                                </div>
                        </div>
                `

        const likeButtonEl = commentEl.querySelector('.like-button')

        // Отклик кнопки лайка
        likeButtonEl.addEventListener('click', (event) => {
            event.stopPropagation()
            comment.isLiked = !comment.isLiked
            comment.likes += comment.isLiked ? 1 : -1
            renderComments()
        })

        // Отклик для ответа на комментарий
        commentEl.addEventListener('click', () => {
            inputTextEl.value = `${comment.author.name}: "${comment.text}" ->`
            console.log(comment.text)
        })
        commentsEl.appendChild(commentEl)
    })
}

loadingCommentsEl.style.display = 'block'

fetch('https://wedev-api.sky.pro/api/v1/michael-stepanov/comments', { method: 'GET' })
    .then((response) => response.json())
    .then((responseObj) => {
        localComments = responseObj.comments
        renderComments()
        loadingCommentsEl.style.display = 'none'
    })

// Отклик на создание нового комментария
btnEl.addEventListener('click', () => {
    const name = textProcessing(inputNameEl.value)
    const text = textProcessing(inputTextEl.value)

    if (name === '' || text === '') {
        alert('Пожалуйста, введите имя и комментарий.')
        return
    }

    // const now = new Date();
    // const formatTime = (n) => n.toString().padStart(2, "0");
    // const currentTime = `${formatTime(now.getDate())}.${formatTime(now.getMonth() + 1)}.${now.getFullYear().toString().slice(-2)} ${formatTime(now.getHours())}:${formatTime(now.getMinutes())}`;

    loadingCommentsEl.style.display = 'block'
    loadingTextEl.innerHTML = 'Комментарий загружается...'
    btnEl.disabled = true

    fetch('https://wedev-api.sky.pro/api/v1/michael-stepanov/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            // forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Слишком короткое имя или комментарий')
            }

            if (response.status >= 500) {
                throw new Error('Сервер решил отдохнуть')
            }

            // возвращаем запрос списка комментариев
            return fetch('https://wedev-api.sky.pro/api/v1/michael-stepanov/comments')
        })
        .then((response) => response.json())
        .then((responseObj) => {
            localComments = responseObj.comments
            renderComments()
            btnEl.disabled = false
            loadingCommentsEl.style.display = 'none'
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Нет соединения. Проверьте интернет и попробуйте снова.')
            } else {
                alert(error.message)
            }

            // не сбрасываем форму
            btnEl.disabled = false
            loadingCommentsEl.style.display = 'none'
        })

    // Очистка полей формы
    inputNameEl.value = ''
    inputTextEl.value = ''
})
