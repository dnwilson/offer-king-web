import { Link } from 'react-router-dom'
import './Nav.scss'
import Logo from './Logo'

const Nav = ({ user, logout }) => {
  return(
    <nav className='navbar'>
      <div className='container'>
        <div className='nav-content'>
          <Logo className='brand' />

          <ul className='nav-items'>
            <li className='nav-item dropdown'>
              <a href='#' className='nav-link'>{user.first_name}</a>
              <ul className='nav-items dropdown-content'>
                <li className='nav-item'><Link to='/profile' className='nav-link'>Profile</Link></li>
                <li className='nav-item'><a onClick={logout} data-method='delete' className='nav-link'>Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export { Nav, Logo }