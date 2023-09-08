import { useContext } from "react";
import { AppContext } from "../AppContext";
import './Profile.scss'

const Profile = () => {
  const { currentUser } = useContext(AppContext)

  return(
    <div className="profile">
      <div className="avatar">
        <div className="initials">{`${currentUser.first_name[0]}${currentUser.last_name[0]}`.trim().toUpperCase()}</div>
      </div>
      <h2 className="name">{`${currentUser.first_name} ${currentUser.last_name}`.trim()}</h2>
      <p className="details">{currentUser.birthdate} | {currentUser.gender}</p>
    </div>
  )
}

export default Profile;