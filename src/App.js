import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { Container } from 'semantic-ui-react';
import Landing from './containers/Landing'
import SignIn from './containers/SignIn'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import Products from './containers/Products'
import ProductPage from './components/ProductPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { API_BASE } from './API'
import Cart from './components/Cart';
import Order from './components/Order'
import Orders from './components/Orders'

export default class App extends React.Component {

  state = {
    user: null,
    products: [],
    filter: {
      type: null,
      value: null
    },
    cart: {}
  }

  componentDidMount(){

    this.getUser()
    this.getCart()

    fetch(API_BASE + 'products')
      .then(resp => resp.json())
      .then(products => {
        const instock = products.filter(product => product.stock > 0)
        this.setState({products: instock})
      })
  }

  getCart = () => {
    const cart = localStorage.getItem('cart')
    if (cart){
      const cartObj = JSON.parse(cart)
      this.setState({cart: cartObj})
    }
  }

  clearCart = () => {
    this.setState({ cart: {} })
  }

  getUser = () => {
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
  }

  signOut = () => {
    this.setState({user:null},localStorage.removeItem('user'))
  }

  setSearch = e => {
    this.setState({filter:{type: 'search', value: e.target.value}})
  }

  setFilter = (type, value) => {
    this.setState({filter:{type, value}})
  }

  addToCart = (id) => {
    this.setState({
      cart: Object.assign({}, this.state.cart, {
        [id]: this.state.cart[id] + 1 || 1
      })
    }, () => localStorage.setItem('cart', JSON.stringify(this.state.cart)))
  }

  removeFromCart = (id) => {
    const newCart = {...this.state.cart}
    if (this.state.cart[id] > 1){
      newCart[id] = this.state.cart[id] - 1
    } else {
      delete newCart[id]
    }
    
    this.setState({
      cart: newCart
    }, () => localStorage.setItem('cart', JSON.stringify(this.state.cart)))
  }

  updateCart = e => {
    console.log(e.target.name, e.target.value)
    this.setState({
        cart: Object.assign({}, this.state.cart, {
          [e.target.name]: e.target.value
        })
    }, () => localStorage.setItem('cart', JSON.stringify(this.state.cart)))

  }

  products = () => {
    const {products, filter} = this.state

    switch(filter.type){
      case 'search':
        return products.filter(product => product.brewery.name.toLowerCase().includes(filter.value.toLowerCase()))
      case 'all products':
        return products
      case 'brewery':
        return products.filter(product => product.brewery.name === filter.value)
      case 'style':
        return products.filter(product => product.style.includes(filter.value))
      default:
        return products
    }
  }
  
  render(){
    return (

      <Router>
        <React.Fragment>
          <ToastContainer containerId={'messages'} position={toast.POSITION.BOTTOM_RIGHT} />

          <NavBar user={this.state.user} signOut={this.signOut} setSearch={this.setSearch} search={this.state.filter.type === 'serach' ? this.state.filter.value : ''} cart={this.state.cart} />
          
          <Container style={{ paddingTop: '6em' }}>
            <Route exact path="/" render={ () => <Landing products={this.products()} filter={this.state.filter.value} setFilter={this.setFilter} />} />
            <Route exact path="/profile" render={ routerProps => <UserProfile {...routerProps} />} />
            <Route exact path="/orders" render={ routerProps => <Orders {...routerProps} />} />
            <Route exact path="/order/:id" render={ routerProps => <Order {...routerProps} />} />
            <Route exact path="/signup" render={ routerProps => <SignUp getUser={this.getUser} {...routerProps} />} />
            <Route exact path="/signin" render={ routerProps => <SignIn getUser={this.getUser} {...routerProps} />} />
            <Route exact path="/products" render={ routerProps => <Products {...routerProps} />} />
            <Route exact path="/product/:id" render={ routerProps => <ProductPage {...routerProps} products={this.state.products} addToCart={this.addToCart} cart={this.state.cart} />} />
            <Route exact path="/cart" render={ routerProps => <Cart {...routerProps} user={this.state.user} cart={this.state.cart } products={this.products()} clearCart={this.clearCart} removeFromCart={this.removeFromCart} addToCart={this.addToCart} />} />
          </Container>
          
        </React.Fragment>
      </Router>
    )
  }
}
