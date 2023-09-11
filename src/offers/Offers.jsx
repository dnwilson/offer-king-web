import { useContext, useState } from 'react';
import { useEffect } from 'react';
import './Offers.scss';
import { AppContext } from '../AppContext';
import useApi from '../hooks/useApi';

const OfferStatus = () => {
  return (
    <div className="status-wrapper">
      <div className={`status claimed`}>claimed</div>
    </div>
  );
};

const Offer = ({ offer }) => {
  const { unclaimOffer, claimOffer } = useApi();
  const [status, setStatus] = useState(offer.claimed ? 'claimed' : 'default');

  const claimIt = () => {
    if (offer.claimed) {
      unclaimOffer(offer.id);
    } else {
      claimOffer(offer.id);
    }
    setStatus(offer.claimed ? 'claimed' : 'default');
  };

  return (
    <a
      onClick={claimIt}
      className={`offer offer-${status}`}
      id={`offer-${offer.id}`}
    >
      <>
        {offer.claimed && <OfferStatus />}
        <img src={offer.image} className="offer-img" lazy="true" />
        <div className="offer-body">
          <h2 className="offer-desc">{offer.description}</h2>
        </div>
      </>
    </a>
  );
};

const OfferList = () => {
  const { fetchOffers } = useApi();
  const { clearSession, offers, setOffers } = useContext(AppContext);

  useEffect(() => {
    if (offers.length == 0) {
      getOffers();
    }
  }, [setOffers]);

  const getOffers = async () => {
    const response = await fetchOffers();
    if (response.data) {
      setOffers(response.data);
    } else if (response?.status == 401) {
      clearSession();
    }
  };

  return (
    <div className="offers">
      <h1>Qualifying Offers</h1>
      {offers?.length > 0 ? (
        offers.map((offer) => <Offer key={offer.id} offer={offer} />)
      ) : (
        <>No available offers</>
      )}
    </div>
  );
};

export { OfferList };
