module.exports = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#()+=^/!%*?&])[A-Za-z\d@$#()+=^/!%*?&]{8,}$/
  
    if (!passwordRegex.exec(password)) {
      return false
    }
  
    return true
}
