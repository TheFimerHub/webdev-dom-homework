import { login } from './api.js'

const tologinEl = document.querySelector('.tologin')
const outloginEl = document.querySelector('.outlogin')
const loginEl = document.querySelector('.login')
const loginButton = document.querySelector('.login__button')
const commentsEl = document.querySelector('.comments')
const formEl = document.querySelector('.add-form')
const inputUserName = document.querySelector('.login__name')
const inputUserPassword = document.querySelector('.login__password')
const inputName = document.querySelector('.add-form-name')

export const renderLogin = () => {
    const tologinButton = document.querySelector('.tologin__button')
    tologinButton.addEventListener('click', () => {
        tologinEl.style.display = 'none'
        loginEl.style.display = 'flex'
        commentsEl.style.display = 'none'
        formEl.style.display = 'none'
    })

    const outloginButton = document.querySelector('.outlogin__button')
    outloginButton.addEventListener('click', () => {
        tologinEl.style.display = 'block'
        loginEl.style.display = 'none'
        commentsEl.style.display = 'flex'
        formEl.style.display = 'flex'
        outloginEl.style.display = 'none'

        inputName.value = ''
        inputName.readOnly = false
        localStorage.clear()
    })

    const loginBackButton = document.querySelector('.login__button_back')
    loginBackButton.addEventListener('click', () => {
        tologinEl.style.display = 'block'
        loginEl.style.display = 'none'
        commentsEl.style.display = 'flex'
        formEl.style.display = 'flex'
    })

    loginButton.addEventListener('click', () => {
        login({
            login: inputUserName.value.trim(),
            password: inputUserPassword.value,
        })
            .then((userData) => {
                localStorage.setItem('token', userData.user.token)
                logined(userData.user.name)
            })
            .catch((err) => {
                alert('Неверный логин или пароль')
                console.warn(err)
            })
    })


}

export const logined = (name) => {
    // Показать форму и комментарии
    loginEl.style.display = 'none'
    tologinEl.style.display = 'none'
    commentsEl.style.display = 'flex'
    formEl.style.display = 'flex'
    outloginEl.style.display = 'flex'

    inputName.value = name
    inputName.readOnly = true
}