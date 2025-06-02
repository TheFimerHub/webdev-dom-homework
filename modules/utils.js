export const textProcessing = (text) => {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

export function formatDateTime(dateInput) {
    const date = new Date(dateInput)

    const formatTime = (n) => n.toString().padStart(2, '0')

    const day = formatTime(date.getDate())
    const month = formatTime(date.getMonth() + 1) // месяцы с 0
    const year = date.getFullYear().toString().slice(-2)
    const hours = formatTime(date.getHours())
    const minutes = formatTime(date.getMinutes())

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

const loadingCommentsEl = document.querySelector('.loading')
const loadingTextEl = document.querySelector('.loading__text')
const btnEl = document.querySelector('.add-form-button')

export const loaderUp = (message) => {
    loadingCommentsEl.style.display = 'block'
    if (message) {
        loadingTextEl.innerHTML = message
    }
    btnEl.disabled = true
}

export const loaderDown = () => {
    loadingCommentsEl.style.display = 'none'
    btnEl.disabled = false
}
