// Dependencies
import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import uuid from 'uuid'

// Components
import Home from './Home'
import Main from './Main'

// Data
import { solicitudes } from './data.json'

class App extends Component {
  constructor () {
    super()
    this.state = {
      solicitudes,
      usario: '',
      id: '',
      razonSocial: '',
      nroCuit: '',
      nroEstablecimiento: '',
      nroTerminal: '',
      modalIsOpen: false,
      modalInputErrorNroCuit: false,
      modalInputErrorNroEstablecimiento: false,
      clickRejectButton: false,
      clickAcceptButton: false,
      disabledAcceptButton: true
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyPressInput = this.handleKeyPressInput.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.accept = this.accept.bind(this)
    this.reject = this.reject.bind(this)
    this.cancelConfirmationMsj = this.cancelConfirmationMsj.bind(this)
    this.acceptConfirmationMsj = this.acceptConfirmationMsj.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleClickUsuario = this.handleClickUsuario.bind(this)
  }

  handleCreate (event) {
    const { razonSocial, nroCuit, nroEstablecimiento } = this.state
    const objSolicitud = {
      id: uuid.v4(),
      razonSocial,
      nroCuit,
      nroEstablecimiento,
      clickRejectButton: false,
      clickAcceptButton: false,
      disabledAcceptButton: true
    }
    this.setState({
      solicitudes: this.state.solicitudes.concat([objSolicitud]),
      usario: '',
      id: '',
      razonSocial: '',
      nroCuit: '',
      nroEstablecimiento: '',
      nroTerminal: '',
      modalIsOpen: false,
      modalInputErrorNroCuit: false,
      modalInputErrorNroEstablecimiento: false,
      clickUsuarioButton: false,
      clickRejectButton: false,
      clickAcceptButton: false,
      disabledAcceptButton: true
    })
  }

  handleClickUsuario () {
    this.setState({
      clickUsuarioButton: true
    })
  }

  handleKeyPressInput (event, id) {
    const inputName = event.target.name
    switch (inputName) {
      case 'nroTerminal':
        if (event.key === 'Enter') {
          this.accept(event, id)
        }
        break
      case 'usuario':
        if (event.key === 'Enter') {
          this.setState({
            clickUsuarioButton: true
          })
        }
        break
    }
  }

  handleInput (event, id) {
    const inputName = event.target.name
    const inputValue = event.target.value
    let patt
    let res
    switch (inputName) {
      case 'usuario':
        if (inputValue !== '') {
          this.setState({
            usuario: inputValue,
            clickUsuarioButton: false
          })
        } else {
          document.getElementById('formSolicitud').reset()
          this.setState({
            usuario: '',
            clickUsuarioButton: false
          })
        }
        break
      case 'razonSocial':
        if (inputValue !== '') {
          this.setState({
            razonSocial: inputValue
          })
        } else {
          this.setState({
            razonSocial: ''
          })
        }
        break
      case 'nroCuit':
        patt = /[0-9]{2}\b-\b[0-9]{8}\b-\b[0-9]{1}/
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            this.setState({
              nroCuit: inputValue,
              modalInputErrorNroCuit: false
            })
          } else {
            this.setState({
              nroCuit: inputValue,
              modalInputErrorNroCuit: true
            })
          }
        } else {
          this.setState({
            nroCuit: '',
            modalInputErrorNroCuit: false
          })
        }
        break
      case 'nroEstablecimiento':
        patt = /[0-9]{7}\b-\b[0-9]{1}/
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            this.setState({
              nroEstablecimiento: inputValue,
              modalInputErrorNroEstablecimiento: false
            })
          } else {
            this.setState({
              nroEstablecimiento: inputValue,
              modalInputErrorNroEstablecimiento: true
            })
          }
        } else {
          this.setState({
            nroEstablecimiento: '',
            modalInputErrorNroEstablecimiento: false
          })
        }
        break
      case 'nroTerminal':
        patt = /^[0-9]*$/gm
        res = patt.test(inputValue)
        if (res) {
          const obj = this.state.solicitudes.find(item => item.id === id)
          let newObj = {}
          if (inputValue !== '') {
            newObj = Object.assign({}, obj, {nroTerminal: inputValue}, {disabledAcceptButton: false})
          } else {
            newObj = Object.assign({}, obj, {nroTerminal: inputValue}, {disabledAcceptButton: true})
          }
          let objIndex
          let i = 0
          let finish = false
          while (i < this.state.solicitudes.length && !finish) {
            if (this.state.solicitudes[i].id === id) {
              finish = true
              objIndex = i
            }
            i++
          }
          this.state.solicitudes.splice(objIndex, 1, newObj)
          this.setState({
            solicitudes: this.state.solicitudes,
            nroTerminal: inputValue
          })
        }
        break
    }
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal (event) {
    this.setState({
      modalIsOpen: false
    })
  }

  removeItem (id) {
    const {solicitudes} = this.state
    const obj = solicitudes.filter(item => item.id !== id)
    this.setState({
      solicitudes: obj
    })
  }

  reject (event, id) {
    const { solicitudes } = this.state
    const item = solicitudes.find(item => item.id === id)
    item.clickRejectButton = true
    this.setState({
      solicitudes
    })
  }

  accept (event, id) {
    const { solicitudes } = this.state
    const item = solicitudes.find(item => item.id === id)
    item.clickAcceptButton = true
    this.setState({
      solicitudes
    })
    this.removeItem(id)
  }

  cancelConfirmationMsj (id) {
    const { solicitudes } = this.state
    const item = solicitudes.find(item => item.id === id)
    item.clickRejectButton = false
    this.setState({
      solicitudes
    })
  }

  acceptConfirmationMsj (id) {
    this.removeItem(id)
  }

  render () {
    const {
      razonSocial,
      nroCuit,
      nroEstablecimiento,
      modalInputErrorNroCuit,
      modalInputErrorNroEstablecimiento } = this.state
    if ((razonSocial !== '' && nroCuit !== '' && nroEstablecimiento !== '') &&
      (!modalInputErrorNroCuit && !modalInputErrorNroEstablecimiento)) {
      console.log('render - App:', this.state)
    }
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={() => {
              return (
                <Home
                  onState={this.state}
                  onClickUsuario={this.handleClickUsuario}
                  onChangeInput={this.handleInput}
                  onKeyPressInput={this.handleKeyPressInput}
                  onCreate={this.handleCreate}
                />)
            }} />
            <Route path='/Main' render={() => {
              return (
                <Main
                  onState={this.state}
                  onCreate={this.handleCreate}
                  onCloseModal={this.closeModal}
                  onOpenModal={this.openModal}
                  onChangeInput={this.handleInput}
                  onReject={this.reject}
                  onKeyPressInput={this.handleKeyPressInput}
                  onAccept={this.accept}
                  onRemoveItem={this.removeItem}
                  onCancelConfirmationMsj={this.cancelConfirmationMsj}
                  onAcceptConfirmationMsj={this.acceptConfirmationMsj}
                />)
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
