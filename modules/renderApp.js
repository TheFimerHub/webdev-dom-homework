import { getComments, postComment, baseUrl } from './api.js'
import { updateComments } from './comments.js'
import { handleError } from './errors.js'
import { renderComments } from './renderComments.js'
import { logined, renderLogin } from './renderLogin.js'
import { loaderUp, loaderDown, textProcessing, isAuthenticated, getUserName } from './utils.js'

export const renderApp = () => {
    loaderUp()

    getComments().then((data) => {
        updateComments(data.comments)
        renderComments()
        loaderDown()
    })

    if (isAuthenticated()) {
        logined(getUserName())
    }
    renderLogin()

    const btnEl = document.querySelector('.add-form-button')
    const inputNameEl = document.querySelector('.add-form-name')
    const inputTextEl = document.querySelector('.add-form-text')

    btnEl.addEventListener('click', () => {
        if (!isAuthenticated()) {
            alert('Чтобы оставить комментарий, войдите в аккаунт');
            return;
        }

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

        inputTextEl.value = ''
    })
}
