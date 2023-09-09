import { useContext, useState } from 'react'
import { get, post, destroy } from '../Api'
import { useEffect } from 'react'
import './Offers.scss'
import { AppContext } from '../AppContext'

const OfferStatus = () => {
  return(
    <div className="status-wrapper">
      <div className={`status claimed`}>claimed</div>
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

  const claimIt = () => {
    if (offer.claimed) {
      unclaimOffer(offer.id, setOffers)
    } else {
      claimOffer(offer.id, setOffers)
    }
    setStatus(offer.claimed ? "claimed" : "default")
  }

  return (
    <a onClick={claimIt} className={`offer offer-${status}`} id={`offer-${offer.id}`}>
      <>
        { offer.claimed &&
          <OfferStatus />
        }
        <img src={offer.image} className='offer-img' lazy />
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
      <h1>Qualifying Offers</h1>
      { offers?.length > 0
        ? offers.map(offer => <Offer key={offer.id} offer={offer} />)
        : <>No available offers</>
      }
    </div>
  )
}

export { OfferList }