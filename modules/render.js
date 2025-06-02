import { localComments } from './comments.js'
import { formatDateTime } from './utils.js'

export const renderComments = () => {
    const commentsEl = document.querySelector('.comments')
    commentsEl.innerHTML = ''

    localComments.forEach((comment) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `
        <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${formatDateTime(comment.date)}</div>
        </div>
        <div class="comment-§ody">
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

        const inputTextEl = document.querySelector('.add-form-text')
        // Отклик для ответа на комментарий
        commentEl.addEventListener('click', () => {
            inputTextEl.value = `${comment.author.name}: "${comment.text}" ->`
        })
        commentsEl.appendChild(commentEl)
    })
}
