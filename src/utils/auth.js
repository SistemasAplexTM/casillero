const Token = 'token'
const User = 'user'
const Agency = 'agency'
const PrincipalAgency = 'principal_agency'

export function getToken() {
  return sessionStorage.getItem(Token)
}

export function setToken(token) {
  return sessionStorage.setItem(Token, token)
}

export function removeToken() {
  return sessionStorage.removeItem(Token)
}

export function getUser() {
  var data = sessionStorage.getItem(User)
  return JSON.parse(data)
}

export function setUser(user) {
  sessionStorage.setItem(User, user)
}

export function removeUser() {
  return sessionStorage.removeItem(User)
}

export function getAgency() {
  var data = sessionStorage.getItem(Agency)
  return JSON.parse(data)
}

export function setAgency(agency) {
  sessionStorage.setItem(Agency, agency)
}

export function removeAgency() {
  return sessionStorage.removeItem(Agency)
}

export function getPrincipalAgency() {
  var data = sessionStorage.getItem(PrincipalAgency)
  return JSON.parse(data)
}

export function setPrincipalAgency(principal_agency) {
  sessionStorage.setItem(PrincipalAgency, principal_agency)
}

export function removePrincipalAgency() {
  return sessionStorage.removeItem(PrincipalAgency)
}
