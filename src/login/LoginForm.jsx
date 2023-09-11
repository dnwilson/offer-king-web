import { useState } from 'react';
import { Logo } from '../shared/Nav';
import useApi from '../hooks/useApi';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const initialData = { email: '', password: '' };
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const { isLoading, loginUser } = useApi();
  const [errors, setErrors] = useState({});
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validate = (field, value) => {
    setErrors({ ...errors, form: null });
    if (field == 'email') {
      const validEmail = EMAIL_REGEX.test(String(value).toLowerCase());
      const message = validEmail ? null : 'Please enter a valid email address';
      setErrors({ ...errors, email: message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validate(name, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData);
    if (response) {
      navigate('/', { replace: true });
    } else {
      setErrors({ ...errors, form: 'Invalid email or password' });
      setFormData(initialData);
    }
  };

  return (
    <div className="login auth">
      {isLoading && (
        <div className="progress">
          <div className="progress-wheel"></div>
        </div>
      )}
      <Logo />
      <form method="post" className="form" onSubmit={onSubmit}>
        {errors.form && <div className="alert">{errors.form}</div>}
        <div className={`form-field ${errors.email != null ? 'error' : null}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email != '' && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
        <div className="actions">
          <p>
            Not a member? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
