// Dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Styles
import styles from './Home.css'

// Assets
import logo from '../assets/logo_visa_blanco.png'

class Home extends Component {
  render () {
    const {
      usuario,
      clickUsuarioButton,
      razonSocial,
      nroCuit,
      nroEstablecimiento,
      modalInputErrorNroCuit,
      modalInputErrorNroEstablecimiento } = this.props.onState
    if ((razonSocial !== '' && nroCuit !== '' && nroEstablecimiento !== '') &&
      (!modalInputErrorNroCuit && !modalInputErrorNroEstablecimiento)) {
      console.log('render - Home:', this.state)
    }
    return (
      <div>
        <div className={styles.banner}>
          <div className={styles.rectangle}>
            <div className={styles.bienvenido}>
              <span>Bienvenido.</span>
              <div className={styles.introduceTuNombre}>
                <input
                  type='text'
                  name='usuario'
                  placeholder='Introduce tu nombre'
                  onChange={(event, id) => this.props.onChangeInput(event, id)}
                  onKeyPress={(event, id) => this.props.onKeyPressInput(event, id)}
                />
                <button onClick={this.props.onClickUsuario} disabled={!usuario}>
                  <i className='fa fa-long-arrow-right' aria-hidden='true' />
                </button>
              </div>
            </div>
            <div className={styles.logoVisa}>
              <img src={logo} alt='Logo Visa' />
              <span>Solicitudes</span>
            </div>
          </div>
          <div className={styles.tarjetaCredito}>
            <div className={styles.logoTarjeta}>
              <img src={logo} alt='Logo Visa' />
            </div>
            <span className={styles.nroTarjeta}>4546 2132 5465 7852</span>
            <div className={styles.datosTarjeta}>
              <div className={styles.nombreTarjeta}>
                <span>NOMBRE DEL <br /> CLIENTE</span>
              </div>
              <div className={styles.vencTarjeta}>
                <span>03/18</span>
              </div>
            </div>
            <form
              id='formSolicitud'
              className={clickUsuarioButton ? styles.formSolicitudOn : styles.formSolicitudOff}>
              <label>CREA TU PROPIA SOLICITUD</label>
              <label>Razón Social</label>
              <input
                type='text'
                name='razonSocial'
                autoComplete='name'
                placeholder='Razón social del comercio'
                disabled={!usuario}
                onChange={(event, id) => this.props.onChangeInput(event, id)}
              />
              <label>Número de CUIT</label>
              <input
                type='text'
                name='nroCuit'
                autoComplete='name'
                placeholder='ej: 54654 - 54654'
                disabled={!usuario}
                className={modalInputErrorNroCuit ? styles.inputError : styles.input}
                onChange={(event, id) => this.props.onChangeInput(event, id)}
              />
              <label>Número de establecimiento</label>
              <input
                type='text'
                name='nroEstablecimiento'
                autoComplete='name'
                placeholder='ej: 545566-0'
                disabled={!usuario}
                className={modalInputErrorNroEstablecimiento ? styles.inputError : styles.input}
                onChange={(event, id) => this.props.onChangeInput(event, id)}
              />
              <Link to='/Main' tabIndex='-1'>
                <button
                  disabled={
                    (razonSocial === '' || nroCuit === '' || nroEstablecimiento === '') ||
                    (modalInputErrorNroCuit || modalInputErrorNroEstablecimiento)}
                  className={
                    (razonSocial === '' || nroCuit === '' || nroEstablecimiento === '') ||
                    (modalInputErrorNroCuit || modalInputErrorNroEstablecimiento)
                      ? styles.buttonCrearSolicitudDisabled
                      : styles.buttonCrearSolicitudEnabled}
                  onClick={this.props.onCreate}
                >Crear solicitud
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className={styles.comienzaAaprobarN}>
          <label>Comienza a aprobar números de establecimiento</label>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus quis orci eget pharetra. Pellentesque lacinia ultrices arcu, quis pulvinar eros iaculis in. Duis ut aliquam felis.
            Donec ut tellus et leo vestibulum lobortis. Aenean dignissim varius est, nec porttitor augue aliquam vitae. Vivamus placerat nunc eu placerat maximus. Morbi tincidunt nunc eu elit porta, vel consequat leo varius. Vivamus vel ornare odio, eget feugiat purus. Aliquam erat volutpat. Vivamus a est blandit, rutrum mauris convallis, facilisis sem. Pellentesque
            pellentesque nunc at ligula lacinia, eget porttitor mauris aliquet. Fusce non felis convallis, ultricies purus at, faucibus nisi. Sed nibh lorem, sodales ut justo sed, rutrum cursus enim. Quisque nec nibh non mi accumsan finibus. Nam iaculis eget justo pharetra finibus.
          </p>
        </div>
      </div>
    )
  }
}

export default Home
