import { userLoginStatus } from '@/src/hooks/userLoginStatus'

const Login = () => {
  const token = userLoginStatus()

  console.log({ token })

  return <p>Hello</p>
}

export default Login
