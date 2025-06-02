export const handleError = (error) => {
    if (error.message === 'Failed to fetch') {
        alert('Нет интернета. Проверьте соединение.')
    } else {
        alert(error.message)
    }
}
