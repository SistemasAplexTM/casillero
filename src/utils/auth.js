const Token = 'token'

export function getToken() {
  // return localStorage.getItem(Token)
  return sessionStorage.getItem(Token)
}

export function setToken(token) {
  // return localStorage.setItem(Token, token)
  return sessionStorage.setItem(Token, token)
}

export function removeToken() {
  // return localStorage.removeItem(Token)
  return sessionStorage.removeItem(Token)
}
