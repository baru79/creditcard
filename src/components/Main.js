// Dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { TransitionGroup } from 'react-transition-group'

// Components
import FadeTransition from './FadeTransition'
import ModalCreate from './ModalCreate'
import Board from './Board'
import Card from './Card'

// Styles
import styles from './Main.css'

// Assets
import logo from '../assets/Combined Shape.png'
import agregarSolicitud from '../assets/add.png'

class Main extends Component {
  render () {
    const {
      solicitudes,
      razonSocial,
      nroCuit,
      nroEstablecimiento,
      modalInputErrorNroCuit,
      modalInputErrorNroEstablecimiento } = this.props.onState
    if ((razonSocial !== '' && nroCuit !== '' && nroEstablecimiento !== '') &&
    (!modalInputErrorNroCuit && !modalInputErrorNroEstablecimiento)) {
      console.log('render - Main:', this.props.onState)
    }
    return (
      <Container>
        <nav>
          <div><Link to='/'><img className={styles.logoVisa} src={logo} alt='Logo Visa' /><span>Solicitudes</span></Link></div>
          <button className={styles.crearBotonSolicitud} onClick={this.props.onOpenModal} >
            <img src={agregarSolicitud} alt='Agregar Solicitudes' /><span>Crear solicitud</span>
          </button>
        </nav>
        <ModalCreate
          onState={this.props.onState}
          onCreate={this.props.onCreate}
          onCloseModal={this.props.onCloseModal}
          onOpenModal={this.props.onOpenModal}
          onHandleInput={this.props.onChangeInput}
        />
        <TransitionGroup component={Board}>
          {
            solicitudes.map((item, index) => {
              return (
                <FadeTransition duration={1000} key={item.id}>
                  <li className={styles.board_item}>
                    <Card
                      key={index}
                      item={item}
                      onReject={this.props.onReject}
                      onChangeInput={this.props.onChangeInput}
                      onKeyPressInput={this.props.onKeyPressInput}
                      onAccept={this.props.onAccept}
                      onRemoveItem={this.props.onRemoveItem}
                      onCancelConfirmationMsj={this.props.onCancelConfirmationMsj}
                      onAcceptConfirmationMsj={this.props.onAcceptConfirmationMsj}
                    />
                  </li>
                </FadeTransition>
              )
            })
          }
        </TransitionGroup>
      </Container>
    )
  }
}

export default Main
