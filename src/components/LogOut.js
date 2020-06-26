/* Import Libs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Tooltip from '@material-ui/core/Tooltip'

/* Import StateApi */
import { getUsername, getToken } from '../stateapi/auth'

/* Import Styled Components */
import { LogOutWrapper } from '../styles/LogOutStyled'

/* Import Constants */
import { AUTH_LOGOUT } from '../constants'
import { doLogOut } from '../webapi'

const LogOut = () => {
  const username = useSelector(getUsername)
  const token = useSelector(getToken)
  const dispatch = useDispatch()

  function logOut () {
    doLogOut(token).then(_ => {
      dispatch({
        type: AUTH_LOGOUT
      })
    })
  }

  return (
    <LogOutWrapper>
      <div className='username'>{username}</div>
      <Tooltip title='Cerrar sesión'>
        <PowerSettingsNewIcon
          style={{ color: '#61dafb', padding: '2px', marginRight: '10px' }}
          onClick={() => logOut()}
        />
      </Tooltip>
    </LogOutWrapper>
  )
}

export default LogOut
