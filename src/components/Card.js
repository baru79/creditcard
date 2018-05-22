// Dependencies
import React, { Component } from 'react'
import moment from 'moment'

// Styles
import styles from './Card.css'

// Assets
import rejectActiveButton from '../assets/reject_active.png'
import rejectInactiveButton from '../assets/reject_inactive.png'
import acceptActiveButton from '../assets/accept_active.png'
import acceptInactiveButton from '../assets/accept_inactive.png'

class Card extends Component {
  date () {
    const date = new Date()
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }

  showRejectConfirmation () {
    return (
      <div className={styles.msjRejected}>
        <span>¿Estás seguro de rechazar la solicitud de este comercio ?</span>
        <div>
          <button
            className={styles.cancelMsjButton}
            onClick={() => this.props.onCancelConfirmationMsj(this.props.item.id)}>
          Cancelar
          </button>
          <button
            className={styles.rejectMsjButton}
            onClick={() => this.props.onAcceptConfirmationMsj(this.props.item.id)}>
          Rechazar
          </button>
        </div>
      </div>
    )
  }

  showInformation () {
    return (
      <div className={styles.infoSolicitud}>
        <ul className={styles.razonSocial}>
          <li>
            {this.props.item.razonSocial}
          </li>
          <li>
            <label>CUIT: </label>{this.props.item.nroCuit}
          </li>
        </ul>
        <ul className={styles.nroEstablecimiento}>
          <li><span>Nº de establecimiento</span></li>
          <li>
            {this.props.item.nroEstablecimiento}
          </li>
          <li>
            {this.date()}
          </li>
        </ul>
        <div className={styles.nroTerminal}>
          <input
            type='text'
            name='nroTerminal'
            id={this.props.item.id}
            placeholder='Nº de Terminal'
            value={this.props.item.nroTerminal ? this.props.item.nroTerminal : ''}
            className={this.props.item.nroTerminal ? styles.borderBottomActive : styles.borderBottomInactive}
            onChange={(event, id) => this.props.onChangeInput(event, this.props.item.id)}
            onKeyPress={(event, id) => this.props.onKeyPressInput(event, this.props.item.id)} />
        </div>
      </div>
    )
  }

  showRejectButton () {
    return (
      <div className={styles.rejectButton}>
        <button id={`rejectButton#${this.props.item.id}`} onClick={(event, id) => this.props.onReject(event, this.props.item.id)}>
          <img
            src={this.props.item.clickRejectButton ? rejectActiveButton : rejectInactiveButton}
            alt='Reject Inactive Button' />
        </button>
      </div>
    )
  }

  showAcceptButton () {
    return (
      <div className={styles.acceptButton}>
        <button
          id={`acceptButton#${this.props.item.id}`}
          onClick={(event, id) => this.props.onAccept(event, this.props.item.id)}
          disabled={!this.props.item.nroTerminal}>
          <img
            src={this.props.item.nroTerminal ? acceptActiveButton : acceptInactiveButton}
            alt='Accept Inactive Button'
          />
        </button>
      </div>
    )
  }

  render () {
    return (
      <div className={this.props.item.clickRejectButton ? styles.confirmationRejectMsj : styles.itemSolicitud}>
        {this.showRejectButton()}
        {this.props.item.clickRejectButton ? this.showRejectConfirmation() : this.showInformation()}
        {this.props.item.clickRejectButton ? null : this.showAcceptButton()}
      </div>
    )
  }
}

export default Card
