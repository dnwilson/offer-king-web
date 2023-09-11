import { useState } from 'react';
import { Logo } from '../shared/Nav';
import useApi from '../hooks/useApi';
import { Link, useNavigate } from 'react-router-dom';
import Progress from '../shared/Progress';

const SignUpForm = () => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const initialData = {
    first_name: '',
    last_name: '',
    gender: 'male',
    birthdate: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  const [formData, setFormData] = useState(initialData);
  const { isLoading, signUp } = useApi();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    setErrors({ ...errors, form: null });
    let message;
    switch (field) {
      case 'email':
        const validEmail = EMAIL_REGEX.test(String(value).toLowerCase());
        message = validEmail ? null : 'Please enter a valid email address';
        setErrors({ ...errors, email: message });
        break;
      case 'password_confirmation':
        message =
          value == formData.password
            ? null
            : 'Confirmation must be the same as password';
        setErrors({ ...errors, password_confirmation: message });
        break;
      default:
        message =
          value == '' ? `${field.split('_').join(' ')} can't be blank` : '';
        setErrors({ ...errors, [field]: message });
        break;
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

    const response = await signUp(formData);
    if (response) {
      navigate('/', { replace: true });
    } else {
      setErrors({ ...errors, form: 'Unable to complete sign up' });
      setFormData(initialData);
    }
  };

  const getClasses = (message) => {
    let baseClass = 'form-field';
    let errorClass =
      message == '' || message == null || message == undefined ? '' : 'error';
    return [baseClass, errorClass].join(' ');
  };

  return (
    <div className="sign-up auth">
      <Progress show={isLoading} />
      <Logo />
      <form method="post" className="form" onSubmit={onSubmit}>
        {errors.form && <div className="alert">{errors.form}</div>}
        <div className="form-group">
          <div className={getClasses(errors.first_name)}>
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            {errors.first_name != '' && (
              <span className="error-message">{errors.first_name}</span>
            )}
          </div>
          <div className={getClasses(errors.last_name)}>
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            {errors.last_name != '' && (
              <span className="error-message">{errors.last_name}</span>
            )}
          </div>
        </div>
        <div className={getClasses(errors.birthdate)}>
          <label htmlFor="birthdate">Birthday</label>
          <input
            id="birthdate"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            required
          />
          {errors.birthdate != '' && (
            <span className="error-message">{errors.birthdate}</span>
          )}
        </div>
        <div className={getClasses(errors.gender)}>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            onChange={handleInputChange}
            value={formData.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.birthdate != '' && (
            <span className="error-message">{errors.birthdate}</span>
          )}
        </div>
        <div className={getClasses(errors.email)}>
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
        <div className="form-group">
          <div className={getClasses(errors.password)}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password != '' && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <div className={getClasses(errors.password_confirmation)}>
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              required
            />
            {errors.password_confirmation != '' && (
              <span className="error-message">
                {errors.password_confirmation}
              </span>
            )}
          </div>
        </div>
        <input type="submit" value="Sign Up" className="btn btn-primary" />
        <div className="actions">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
