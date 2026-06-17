export const userLoginStatus = () => {
  const token = localStorage.getItem('login-ingo')
  return !!token
}
