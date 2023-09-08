import { useContext, useRef, useState } from 'react'
import { AppContext } from '../AppContext'
import './LoginForm.scss'
import { Logo } from '../shared/Nav'
import { post } from '../Api'

const LoginForm = () => {
  const email = useRef()
  const password = useRef()
  const { setSession, currentUser, token } = useContext(AppContext)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const validate = (ref) => {
    if (ref.current.type == 'email') {
      const validEmail = EMAIL_REGEX.test(String(ref.current.value).toLowerCase())
      const message = validEmail ? '' : 'Please enter a valid email address'
      setErrors({...errors, email: message})
    }
  }

  const submitToServer = () => {
    const params = { email: email.current.value, password: password.current.value }
    post('login', params)
      .then(response => response.data)
      .then((data) => {
        setSession(data)
      })
      .catch((error) => {
        email.current.value = ''
        password.current.value = ''
        setErrors({...errors, form: "Invalid login"})
        setInterval(() => { setErrors({...errors, form: null}) }, 1500);
      })
  }

  const onSubmit = (e) => {
    setErrors({...errors, form: null})
    e.preventDefault()

    submitToServer()
  }

  return(
    <div className="login">
      <Logo />
      <form method='post' className='form' onSubmit={onSubmit}>
        { errors.form &&
          <div className="alert">{errors.form}</div>
        }
        <div className={`form-field ${ errors.email != '' ? 'error' : null }`}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            ref={email}
            onBlur={validate.bind(this, email)}
            required />
            {errors.email != '' &&
              <span className='error-message'>{errors.email}</span>
            }
        </div>
        <div className='form-field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            ref={password}
            required />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </div>
  )
}

export default LoginForm;