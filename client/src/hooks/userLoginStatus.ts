export const userLoginStatus = () => {
  const { accessToken, refreshToken } = JSON.parse(localStorage.getItem('tokens') || '{}')

  return !accessToken || !refreshToken ? false : true
}
