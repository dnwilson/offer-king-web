import { useContext, useState } from 'react'
import { get, post, destroy } from '../Api'
import { useEffect } from 'react'
import './Offers.scss'
import { AppContext } from '../AppContext'

const OfferStatus = ({ status }) => {
  return(
    <div className="status-wrapper">
      <div className={`status ${status}`}>{status}</div>
    </div>
  )
}

const claimOffer = (id, setOffers) => {
  post(`offers/${id}/offers`)
    .then((response) => {
      const offer = response.data
      setOffers(offers => offers.map((off) => (off.id === offer.id ? offer : off)))
    })
    .catch((error) => {
      console.error(error)
    })
}

const unclaimOffer = (id, setOffers) => {
  destroy(`offers/${id}`)
    .then((response) => {
      const newOffer = response.data
      setOffers(offers => offers.map(offer => offer.id === newOffer.id ? newOffer : offer ))
    })
    .catch((error) => {
      console.error(error)
    })
}

const Offer = ({ offer }) => {
  const { setOffers } = useContext(AppContext)
  const [status, setStatus] = useState(offer.claimed ? "claimed" : "default");

  const handleMouseOver = () => {
    setStatus(offer.claimed ? "remove" : "claim")
  }

  const handleMouseOut = () => {
    setStatus(offer.claimed ? "claimed" : "default")
  }

  const claimIt = () => {
    if (offer.claimed) {
      unclaimOffer(offer.id, setOffers)
    } else {
      claimOffer(offer.id, setOffers)
    }
  }

  return (
    <a
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut} 
      onClick={claimIt} className={`offer offer-${status}`} id={`offer-${offer.id}`}>
      <>
        <OfferStatus claimed={offer.claimed} status={status} />
        <img src={offer.image} className='offer-img' />
        <div className='offer-body'>
          <h2 className='offer-desc'>{offer.description}</h2>
        </div>
      </>
    </a>
  )
}

const OfferList = () => {
  const { clearSession, offers, setOffers } = useContext(AppContext)

  useEffect(() => {
    if (offers.length == 0) {
      fetchOffers()
    }
  }, [setOffers])

  const fetchOffers = () => {
    get('offers')
      .then(response => response.data)
      .then(data => {
        setOffers(data)
      })
      .catch((error) => {
        console.error(error)
        if (error?.response?.status == 401) {
          clearSession()
        }
      })
  }

  return(
    <div className='offers'>
      { offers?.length > 0
        ? offers.map(offer => <Offer key={offer.id} offer={offer} />)
        : <>No available offers</>
      }
    </div>
  )
}

export { OfferList }