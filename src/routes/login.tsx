import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/login' })
  const [auth, setAuth] = useState({ username: '', password: '' })
  const signIn = () => {
    if (
      [
        'fixy.maulana@gmail.com',
        'anggivoitlanar@gmail.com',
        'nuralia.syafitri@gmail.com',
        'malanopictures@gmail.com',
        'nadeadima29@gmail.com',
        'anto.suharyanto@gmail.com',
      ].includes(auth.username) &&
      auth.password === 'kkmberkah2025'
    ) {
      localStorage.setItem('session', String(new Date().getTime()))
      navigate({ to: '/app' })
    } else {
      alert('invalid user or password')
    }
  }
  useEffect(() => {
    localStorage.removeItem('session')
  }, [])
  return (
    <div className="container w-full h-screen flex justify-center items-center m-auto">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src="/logo.jpeg" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Organizer Sign In</h2>
          <div className="w-full">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">E-mail</legend>
              <input
                type="text"
                className="input"
                placeholder="Your Email"
                value={auth.username}
                onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Your Password"
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary" onClick={signIn}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
