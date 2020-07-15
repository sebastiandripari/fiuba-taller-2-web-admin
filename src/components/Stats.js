/* Import Libs */
import React, { useEffect, useState } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../constants'

const Stats = () => {
  const startDate = '2020-04-29'
  const endDate = '2020-05-30'

  const [loading, changeLoading] = useState(true)

  const [activeRecovery, changeActiveRecovery] = useState()
  const [activeSessions, changeActiveSessions] = useState()

  const [registeredAdminUsers, changeRegisteredAdminUsers] = useState()
  const [
    registeredAdminUsersActive,
    changeRegisteredAdminUsersActive
  ] = useState()
  const [
    registeredAdminUsersClosed,
    changeRegisteredAdminUsersClosed
  ] = useState()

  const [registeredUsers, changeRegisteredUsers] = useState()
  const [registeredUsersActive, changeRegisteredUsersActive] = useState()
  const [registeredUsersClosed, changeRegisteredUsersClosed] = useState()
  const [
    registeredAdminUsersLoginService,
    changeRegisteredAdminUsersLoginService
  ] = useState()

  useEffect(() => {
    getStats(startDate, endDate)
      .then(response => {
        const { data } = response
        console.error(data)
        changeActiveRecovery(data.active_recovery)
        changeActiveSessions(data.active_sessions)

        changeRegisteredAdminUsers(data.registered_adminusers)
        changeRegisteredAdminUsersActive(data.registered_adminusers_active)
        changeRegisteredAdminUsersClosed(data.registered_adminusers_closed)

        changeRegisteredUsers(data.registered_users)
        changeRegisteredUsersActive(data.registered_users_active)
        changeRegisteredUsersClosed(data.registered_users_closed)
        changeRegisteredAdminUsersLoginService(
          data.registered_users_login_service
        )
        changeLoading(false)
      })
      .catch(_ => {
        console.error('Get Stats Error')
      })
  }, [])
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <div className='stats'>
          <div className='stat'>
            <h3>Sessiones & Links</h3>
            <div>
              Sesiones Activas: <b>{activeSessions}</b>
            </div>
            <div>
              Links de Recuperar Contraseña Activos: <b>{activeRecovery}</b>
            </div>
          </div>

          <p />

          <div className='stat'>
            <h3>Usuarios Admin</h3>
            <div>
              Registrados: <b>{registeredAdminUsers}</b>
            </div>
            <div>
              Registrados Activos: <b>{registeredAdminUsersActive}</b>
            </div>
            <div>
              Registrados Cerrados: <b>{registeredAdminUsersClosed}</b>
            </div>
          </div>

          <p />

          <div className='stat'>
            <h3>Usuarios</h3>
            <div>
              Registrados: <b>{registeredUsers}</b>
            </div>
            <div>
              Registrados Activos: <b>{registeredUsersActive}</b>
            </div>
            <div>
              Registrados Cerrados: <b>{registeredUsersClosed}</b>
            </div>
            <div>
              Registrados con Login Service:{' '}
              <b>{registeredAdminUsersLoginService}</b>
            </div>
          </div>
        </div>
      )}
    </StatsWrapper>
  )
}

export default Stats
