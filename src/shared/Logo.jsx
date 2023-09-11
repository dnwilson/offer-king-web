import { Link } from 'react-router-dom'
import logo from '../assets/king-icon.png'
import './Logo.scss'

const Logo = ({ className }) => {
  return (
    <Link to='/' className={`logo ${className ? className : ''}`}>
      <div className='logo-img'>
        <img src={logo} className='img' />
      </div>
      <span className='brand-name'>OfferKing</span>
    </Link>
  )
}

export default Logo