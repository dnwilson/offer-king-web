import logo from '../assets/king-icon.png'
import './Nav.scss'

const Logo = ({ className }) => {
  return (
    <a href='/' className={`logo ${className ? className : ''}`}>
      <div className='logo-img'>
        <img src={logo} className='img' />
      </div>
      <span className='brand-name'>OfferKing</span>
    </a>
  )
}

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
                <li className='nav-item'><a href='/profile' className='nav-link'>Profile</a></li>
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