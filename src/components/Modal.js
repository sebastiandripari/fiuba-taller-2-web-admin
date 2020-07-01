/* Import Libs */
import React from 'react'
import { StyledModal } from '../styles/ModalStyled'

const DeleteModal = ({
  name,
  resource,
  modalOpen,
  changeModalOpen,
  remove
}) => {
  return (
    <StyledModal
      isOpen={modalOpen}
      onBackgroundClick={null}
      onEscapeKeydown={null}
    >
      <span>
        Esta seguro que desea borrar el {resource} {name}?
      </span>
      <div className='actions'>
        <button onClick={() => changeModalOpen(false)}>Cancelar</button>
        <button onClick={remove}>Aceptar</button>
      </div>
    </StyledModal>
  )
}

export default DeleteModal
