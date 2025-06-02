import { getComments, postComment } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { handleError } from './modules/errors.js'
import { renderComments } from './modules/render.js'
import { loaderUp, loaderDown } from './modules/utils.js'

export const textProcessing = (text) => {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

const loadComments = () => {
    const loadingCommentsEl = document.querySelector('.loading')
    loadingCommentsEl.style.display = 'block'

    loaderUp()

    getComments().then((data) => {
        updateComments(data.comments)
        renderComments()
        loaderDown()
    })
}

const btnEl = document.querySelector('.add-form-button')
const inputNameEl = document.querySelector('.add-form-name')
const inputTextEl = document.querySelector('.add-form-text')

btnEl.addEventListener('click', () => {
    const name = textProcessing(inputNameEl.value)
    const text = textProcessing(inputTextEl.value)

    if (name === '' || text === '') {
        alert('Пожалуйста, введите имя и комментарий.')
        return
    }

    loaderUp('Загрузка комментария...')

    postComment(name, text)
        .then(() => {
            return getComments()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
        .catch(handleError)
        .finally(loaderDown())

    // Очистка полей формы
    inputNameEl.value = ''
    inputTextEl.value = ''
})

loadComments()
