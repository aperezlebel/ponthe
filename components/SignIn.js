import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TextInput, Text, Button, TouchableOpacity } from 'react-native'
import { getToken } from '../API/connexion'
import UserInfo from '../lib/userClass'
import { ponthe_color } from '../constants.js'

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      msg: ''
    }
    this.email = ''
    this.password = ''
  }

  _emailInputChanged(email) {
    this.email = email
  }

  _passwordInputChanged(password) {
    this.password = password
  }

  _connexion() {
    getToken(this.email, this.password).then((responseJson) => {
      if(responseJson.msg != undefined){
        this.setState({ msg: responseJson.msg })
        console.log(responseJson.msg)
      }
      if(responseJson.token != undefined){
        console.log(responseJson.token)
        this.props.navigation.navigate('Home')
      }
    })
  }

  // Temporary function to shortcut sign in
  _shortCutConnexion() {
    const userInfo = new UserInfo()
    userInfo.email = 'user@eleves.enpc.fr'
    userInfo.token = '0'
    const action = { type: "UPDATE_USERINFO", value: userInfo }
    this.props.dispatch(action)
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style = {styles.main_container}>
        <View style = {styles.image_container}>
          <Image
            source = {sourceLogo}
            style= {styles.image}
          />
        </View>
        <View style={styles.ids_container}>
          <Text style={styles.message}>
            {this.state.msg}
          </Text>
          <TextInput
            style={styles.ids_text}
            placeholder = 'Identifiant'
            onChangeText = {(text) => this._emailInputChanged(text)}
            autoCapitalize = 'none'
            autoCorrect = {false}
          />
          <TextInput
            style={styles.ids_text}
            placeholder = 'Mot de passe'
            onChangeText = {(text) => this._passwordInputChanged(text)}
            autoCapitalize = 'none'
            autoCorrect = {false}
            secureTextEntry = {true}
          />
        </View>
        <View style = {styles.button_container}>
          <TouchableOpacity
            style = {styles.button_shape}
            //activeOpacity = {.5}
            onPress = {() => this._shortCutConnexion()}>
            <Text style = {styles.button_text}>
              Connexion
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.reset_button_shape}
            onPress = {() => this._shortCutConnexion()}>
            <Text style = {styles.reset_button_text}>
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const sourceLogo = require('../images/ponthe_logo.png')

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  image_container: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    height: 220,
    width: 220
  },
  ids_container: {
    marginHorizontal: 90
  },
  ids_text: {
    height: 40
  },
  reset_button_container: {
    height: 40,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  reset_button_shape: {
    marginTop: 40
  },
  reset_button_text: {
    fontStyle: 'italic',
    color: 'lightgray'
  },
  button_container: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50
  },
  button_shape: {
    height: 50,
    width: 180,
    borderRadius: 25,
    backgroundColor: ponthe_color,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold'
  },
  message: {
    color: 'red',
    height: 15
  }
})

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(SignIn)
