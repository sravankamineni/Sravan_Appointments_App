import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterFavourite: false,
  }

  toogleIsFavourited = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachappointment => {
        if (id === eachappointment.id) {
          return {...eachappointment, isFavourite: !eachappointment.isFavourite}
        }
        return eachappointment
      }),
    }))
  }

  onClickStar = () => {
    const {isFilterFavourite} = this.state
    this.setState({isFilterFavourite: !isFilterFavourite})
  }

  getTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  getDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isFavourite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isFilterFavourite} = this.state
    if (isFilterFavourite) {
      return appointmentsList.filter(
        eachappointment => eachappointment.isFavourite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterFavourite} = this.state
    const filterClassName = isFilterFavourite ? 'filter-filled' : 'filter-empty'
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="app-cont">
        <div className="responsive-cont">
          <div className="appointment-cont">
            <div className="add-appointment-cont">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="app-head">Add Appointment</h1>

                <label className="label" htmlFor="title">
                  TITLE
                </label>

                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="input"
                  value={titleInput}
                  onChange={this.getTitle}
                />

                <label htmlFor="date" className="label">
                  DATE
                </label>

                <input
                  value={dateInput}
                  type="date"
                  id="date"
                  className="input"
                  onChange={this.getDate}
                />

                <button className="btn" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="imag"
                alt="appointments"
              />
            </div>
            <hr />
            <div className="appointments-cont">
              <h1 className="apps-head">Appointments</h1>
              <button
                onClick={this.onClickStar}
                type="button"
                className={`filter-style ${filterClassName}`}
              >
                Starred
              </button>
            </div>

            <ul className="appointments-list">
              {filteredAppointments.map(eachappointment => (
                <AppointmentItem
                  key={eachappointment.id}
                  appointmentDetails={eachappointment}
                  toogleIsFavourited={this.toogleIsFavourited}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
