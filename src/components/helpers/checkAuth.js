module.exports = {
    isAuthed: () => {
        if (localStorage.getItem('user')) return true // Will add a request to the API to check if token is still valid
        return false
    }
}