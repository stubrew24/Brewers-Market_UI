import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { Container } from 'semantic-ui-react';
import Landing from './containers/Landing'
import SignIn from './containers/SignIn'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = 'http://localhost:3000/api/v1/'

export default class App extends React.Component {

  state = {
    user: null,
    products: [],
    search: '',
    signup: false,
    update: false
  }

  componentDidMount(){

    const token = localStorage.getItem('user')
    if (token) {
      fetch(API_BASE + 'auto_signin', {
        headers: {'Authorization':token}
      }).then(resp => resp.json())
        .then(response => {
          if (response.error) return
          this.setState({user: response.user})
        })
    }

    fetch(API_BASE + 'products')
      .then(resp => resp.json())
      .then(products => this.setState({products}))
  }

  
  signInSubmit = user => {
    fetch(API_BASE + 'signin',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    }).then(resp => resp.json())
      .then(response => {
        if (response.error) {
          toast.error('Signin Failed! Please try again.', {containerId: 'messages'})
        } else {
          this.setState({user: response.user}, localStorage.setItem('user', response.token))
        }
      })
  }

  signUpSubmit = newUser => {
    fetch(API_BASE + 'users', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newUser)
    }).then(resp => resp.json())
      .then(response => {
        if (response.error) {
          response.error.map(err => toast.error(err, {containerId: 'messages'}))
        } else {
          this.setState({user: response.user}, localStorage.setItem('user', response.token))
        }
      })
  }

  signOut = () => {
    this.setState({user:null, signup:false},localStorage.removeItem('user'))
  }

  signUpBtn = () => {
    this.setState({signup:true})
  }
  
  updateBtn = () => {
    this.setState({update:true})
  }

  setSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  products = () => {
    if (this.state.search){
      return this.state.products.filter(product => product.brewery.name.toLowerCase().includes(this.state.search.toLowerCase()))
    } else {
      return this.state.products
    }
  }

  updateDetails = userDetails => {
    fetch(API_BASE + `users/${this.state.user.id}`, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userDetails)
    }).then(resp => resp.json())
      .then(response => {
        if (response.error) {
          response.error.map(err => toast.error(err, {containerId: 'messages'}))
        } else {
          toast.success('Details updated.', {containerId: 'messages'})
          this.setState({user: response, update: false})
        }
      })
  }
  
  render(){
    return (
      <React.Fragment>
        <ToastContainer containerId={'messages'} position={toast.POSITION.BOTTOM_RIGHT} />
        <NavBar user={this.state.user} updateBtn={this.updateBtn} signOut={this.signOut} setSearch={this.setSearch} search={this.state.search} />
        <Container style={{ paddingTop: '5em' }}>
          { this.state.user 
            ?
              ( this.state.update
                  ?
                    <UserProfile user={this.state.user} updateDetails={this.updateDetails}/>
                  :
                    <Landing products={this.products()} search={this.state.search} />
              )
            : ( this.state.signup 
                ?
                  <SignUp signUpSubmit={this.signUpSubmit} />
                : 
                  <SignIn signInSubmit={this.signInSubmit} signUpBtn={this.signUpBtn} />
              )
          }
        </Container>
      </React.Fragment>
    )
  }
}
