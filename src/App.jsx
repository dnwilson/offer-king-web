import { useState } from 'react'
import { AppContext } from './AppContext'
import { Route, Routes } from 'react-router-dom'
import { OfferList } from './offers/Offers'
import { Nav } from './shared/Nav'
import LoginForm from './login/LoginForm'
import './App.scss'
import { useSession } from './hooks/useSession'
import Profile from './profile/Profile'

const App = () => {
  const { token, currentUser, setSession, clearSession } = useSession()
  const [offers, setOffers] = useState([])

  return (
    <AppContext.Provider value={{currentUser, setSession, clearSession, setOffers, offers}}>
      { token
        ? (
          <>
            <Nav user={currentUser} logout={clearSession} />
            <div className="main">
              <div className="container">
                  <Routes>
                    <Route path='/' element={<OfferList />} />
                    <Route path='/profile' element={<Profile />} />
                  </Routes>
              </div>
            </div>
          </>
        )
        : <LoginForm />
      }
    </AppContext.Provider>
  )
}

export default App
