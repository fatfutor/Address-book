import * as types from '../constants'

const initialState = []

export default function(state = initialState, action) {
  const { type, payload, generatedId } = action

  switch (type) {

    case types.ADD_EMPLOYEE:
      const { name, surname, middleName, email, skills } = payload
      localStorage.setItem('employees', JSON.stringify([...state ].concat({
        id: generatedId,
        name,
        surname,
        middleName,
        email,
        skills
      })))
      return JSON.parse(localStorage.getItem('employees'))

    case types.DELETE_EMPLOYEE:
      localStorage.setItem('employees', JSON.stringify(state.filter( employee => {
        return (employee.id !== payload.id)
      })))
      return JSON.parse(localStorage.getItem('employees'))

    case types.CONFIRM_EDIT_EMPLOYEE:
      const { id, fieldName, data } = payload
      const newEmployees = JSON.parse(localStorage.getItem('employees')).map( employee => {
        if (employee.id === id) {
          return {...employee, [fieldName]: data }
        }
        return employee
      })
      localStorage.setItem('employees', JSON.stringify(newEmployees))
      return JSON.parse(localStorage.getItem('employees'))

    default:
      return state
  }
}
