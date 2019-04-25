import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { Container } from 'semantic-ui-react';
import Landing from './containers/Landing'
import SignIn from './containers/SignIn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {

  state = {
    user: null,
    products: [],
    search: ''
  }

  componentDidMount(){

    const token = localStorage.getItem('user')
    if (token) {
      fetch('http://localhost:3000/api/v1/auto_signin', {
        headers: {'Authorization':token}
      }).then(resp => resp.json())
        .then(response => {
          if (response.error) return
          this.setState({user: response.user})
        })
    }

    fetch('http://localhost:3000/api/v1/products')
      .then(resp => resp.json())
      .then(products => this.setState({products}))
  }

  
  signInSubmit = user => {
    fetch('http://localhost:3000/api/v1/signin',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    }).then(resp => resp.json())
      .then(response => {
        if (response.error) {
          toast('Signin Failed! Please try again.', {containerId: 'signinFailed'})
        } else {
          this.setState({user: response.user}, localStorage.setItem('user', response.token))
        }
      })
  }

  signOut = () => {
    this.setState({user:null},localStorage.removeItem('user'))
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
  
  render(){
    return (
      <React.Fragment>
        <ToastContainer containerId={'signinFailed'} position={toast.POSITION.TOP_RIGHT} />
        <NavBar user={this.state.user} signOut={this.signOut} setSearch={this.setSearch} search={this.state.search} />
        <Container style={{ paddingTop: '5em' }}>
          { this.state.user 
            ?
              <Landing products={this.products()} search={this.state.search} />
            :
              <SignIn signInSubmit={this.signInSubmit} />
          }
        </Container>
      </React.Fragment>
    )
  }
}
