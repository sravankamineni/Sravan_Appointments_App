import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toogleIsFavourited} = props
  const {id, title, date, isFavourite} = appointmentDetails

  const starImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarred = () => {
    toogleIsFavourited(id)
  }

  return (
    <li className="list-cont">
      <div className="text">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        data-testid="star"
        type="button"
        onClick={onStarred}
        className="star-btn"
      >
        <img src={starImgUrl} className="star" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
