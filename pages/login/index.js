import { useRef } from "react";
import withUnprotected from "../../hoc/withUnprotected";

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const submitLogin = async (event) => {
    event.preventDefault()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ email, password })
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-200">
      <div className="p-8 bg-white rounded-md">
        <h1 className="text-xl text-center mb-8">Login</h1>
        <form className="grid gap-y-4" onSubmit={submitLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              ref={emailRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="button mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default withUnprotected(Login);
