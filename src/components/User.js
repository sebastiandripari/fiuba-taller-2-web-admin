import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUser, saveUser } from '../webapi'
import { useParams } from 'react-router-dom'

import { UserWrapper } from '../styles/UserStyled'

const User = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState({ contact: {} })
  const [edit, changeEdit] = useState(false)

  const [Username, changeUsername] = useState()
  const [email, changeEmail] = useState()
  const [phone, changePhone] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    getUser(token, username)
      .then(response => {
        const { data } = response
        const { username, contact } = data
        const { email, phone } = contact
        changeUser(data)
        changeUsername(username)
        changeEmail(email)
        changePhone(phone)
        changeFirstName(data.first_name)
        changeLastName(data.last_name)
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }, [token, username, dispatch])

  function save () {
    saveUser(token, username, {
      first_name: firstName,
      last_name: lastName,
      contact: {
        email: email,
        phone: phone
      }
    })
      .then(_ => {})
      .catch(_ => {})
  }

  return (
    <UserWrapper>
      <h2>Usuario</h2>
      <div>
        <div>Usuario: {Username}</div>
        <div>
          Mail:{' '}
          {edit ? (
            <input value={email} onChange={e => changeEmail(e.target.value)} />
          ) : (
            email
          )}
        </div>
        <div>
          Telefono:{' '}
          {edit ? (
            <input value={phone} onChange={e => changePhone(e.target.value)} />
          ) : (
            phone
          )}
        </div>
        <div>
          Nombre:{' '}
          {edit ? (
            <input
              value={firstName}
              onChange={e => changeFirstName(e.target.value)}
            />
          ) : (
            firstName
          )}
        </div>
        <div>
          Apellido:{' '}
          {edit ? (
            <input
              value={lastName}
              onChange={e => changeLastName(e.target.value)}
            />
          ) : (
            lastName
          )}
        </div>
        <div>Servicio de LogIn: {user.login_service ? 'Si' : 'No'}</div>
      </div>
      <button onClick={() => changeEdit(!edit)}>Edit</button>
      {edit && <button onClick={() => save()}>Save</button>}
    </UserWrapper>
  )
}

export default User
