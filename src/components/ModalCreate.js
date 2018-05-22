// Dependencies
import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container } from 'semantic-ui-react'

// Styles
import styles from './ModalCreate.css'

Modal.setAppElement('#root')

class ModalCreate extends Component {
  showModal (razonSocial, nroCuit, nroEstablecimiento, modalInputErrorNroCuit, modalInputErrorNroEstablecimiento) {
    return (
      <Container>
        <div className={styles.title}>
          <h1>Crear Solicitud</h1>
        </div>
        <form>
          <ul className={styles.wrapper1}>
            <li className={styles.formRow}>
              <label>Razon social: </label><br />
              <input
                type='text'
                name='razonSocial'
                placeholder='Ej. Nexus'
                autoComplete='name'
                className={styles.input}
                onChange={(event, id) => this.props.onHandleInput(event, id)}
              />
            </li>
            <ul className={styles.wrapper2}>
              <li className={styles.formRow}>
                <label>Numero de CUIT: </label><br />
                <input
                  type='text'
                  name='nroCuit'
                  placeholder='00-000000-0'
                  maxLength='13'
                  className={modalInputErrorNroCuit ? styles.inputError : styles.input}
                  onChange={(event, id) => this.props.onHandleInput(event, id)}
                />
              </li>
              <li className={styles.formRow}>
                <label>Numero de establecimiento: </label><br />
                <input
                  type='text'
                  name='nroEstablecimiento'
                  placeholder='0000000-0'
                  maxLength='9'
                  className={modalInputErrorNroEstablecimiento ? styles.inputError : styles.input}
                  onChange={(event, id) => this.props.onHandleInput(event, id)}
                />
              </li>
            </ul>
            <li className={styles.formRowButtons}>
              <button
                className={styles.buttonCancel}
                onClick={this.props.onCloseModal}>
                Cancelar
              </button>
              <button
                disabled={(
                  razonSocial === '' || nroCuit === '' || nroEstablecimiento === '') ||
                  (modalInputErrorNroCuit || modalInputErrorNroEstablecimiento)}
                className={styles.buttonCreate}
                onClick={this.props.onCreate}>
                Crear
              </button>
            </li>
          </ul>
        </form>
      </Container>
    )
  }

  render () {
    const {
      modalIsOpen,
      razonSocial,
      nroCuit,
      nroEstablecimiento,
      modalInputErrorNroCuit,
      modalInputErrorNroEstablecimiento } = this.props.onState
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.props.onCloseModal}
        className={styles.content}
        contentLabel='Example Modal'
      >
        {this.showModal(
          razonSocial,
          nroCuit,
          nroEstablecimiento,
          modalInputErrorNroCuit,
          modalInputErrorNroEstablecimiento
        )}
      </Modal>
    )
  }
}

export default ModalCreate
