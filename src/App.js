import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Container } from 'semantic-ui-react'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { API_BASE } from './API'

import Landing from './containers/Landing'
import Products from './containers/Products'
import SignIn from './containers/SignIn'

import Brewery from './components/Brewery'
import BreweryNewProduct from './components/BreweryNewProduct'
import BreweryProduct from './components/BreweryProduct'
import BreweryProducts from './components/BreweryProducts'
import BreweryProfile from './components/BreweryProfile'
import Cart from './components/Cart'
import Help from './components/Help'
import NavBar from './components/NavBar'
import Order from './components/Order'
import Orders from './components/Orders'
import ProductPage from './components/ProductPage'
import Review from './components/Review'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'

export default class App extends React.Component {

  state = {
    user: null,
    brewery: null,
    products: [],
    filter: {
      type: null,
      value: null
    },
    cart: {},
    loggedIn: !!localStorage.getItem('user')
  }

  componentDidMount(){

    this.getUser()
    this.getCart()
    this.getProducts()
  }

  getCart = () => {
    const cart = localStorage.getItem('cart')
    if (cart){
      const cartObj = JSON.parse(cart)
      this.setState({cart: cartObj})
    }
  }

  getProducts = () => {
    fetch(API_BASE + 'products')
      .then(resp => resp.json())
      .then(products => {
        const instock = products.filter(product => product.stock > 0)
        this.setState({products: instock})
      })
  }

  refreshData = () => {
    this.getUser()
    this.getProducts()
  }

  clearCart = () => {
    this.setState({ cart: {} })
    localStorage.removeItem('cart')
  }

  getUser = () => {
    const token = localStorage.getItem('user')
    if (token) {
      fetch(API_BASE + 'auto_signin', {
        headers: {'Authorization':token}
      }).then(resp => resp.json())
        .then(response => {
          if (response.error) {
            localStorage.clear()
          }
          this.setState({user: response.user, brewery: response.user.brewery, loggedIn: true})
        })
    }
  }

  signOut = () => {
    this.setState({user:null, loggedIn: null, cart: {}},localStorage.clear())
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

  removeLineFromCart = (id) => {
    const newCart = {...this.state.cart}
    delete newCart[id]
    
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
    const products = [...this.state.products]
    const { filter } = this.state

    switch(filter.type){
      case 'search':
        return products.filter(product => {
          return product.brewery.name.toLowerCase().includes(filter.value.toLowerCase()) ||
          product.description.toLowerCase().includes(filter.value.toLowerCase()) ||
          product.name.toLowerCase().includes(filter.value.toLowerCase())
        })
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

    const breweryUser = !!this.state.brewery 

    if (this.state.loggedIn) return (

      <Router>
        <ToastContainer containerId={'messages'} position={toast.POSITION.BOTTOM_RIGHT} />
        <Route path="/" render={ routerProps => <NavBar user={this.state.user} signOut={this.signOut} setSearch={this.setSearch} search={this.state.filter.type === 'search' ? this.state.filter.value : ''} cart={this.state.cart} {...routerProps}/>} />
          
        <Container style={{ paddingTop: '6em' }}>
          <Route exact path="/" render={ () => <Landing products={this.products()} filter={this.state.filter} setFilter={this.setFilter} user={this.state.user} refreshData={this.refreshData}/>} />
          {
            breweryUser ?
            <React.Fragment>
              <Route exact path="/brewery/profile" render={ routerProps => <BreweryProfile {...routerProps} brewery={this.state.user.brewery} getUser={this.getUser} getProducts={this.getProducts} />} />
              <Route exact path="/brewery/products" render={ routerProps => <BreweryProducts {...routerProps} brewery={this.state.user.brewery}  />} />
              <Route exact path="/brewery/newproduct" render={ routerProps => <BreweryNewProduct {...routerProps} brewery={this.state.user.brewery} getUser={this.getProducts} />} />
              <Route exact path="/brewery/products/:id" render={ routerProps => <BreweryProduct {...routerProps} getUser={this.getProducts} />} />
            </React.Fragment>
            :
            <React.Fragment>
              <Route exact path="/orders" render={ routerProps => <Orders {...routerProps} user={this.state.user} />} />
              <Route exact path="/order/:id" render={ routerProps => <Order {...routerProps} />} />
              <Route exact path="/cart" render={ routerProps => <Cart {...routerProps} user={this.state.user} cart={this.state.cart } products={this.products()} clearCart={this.clearCart} removeFromCart={this.removeFromCart} addToCart={this.addToCart} removeLineFromCart={this.removeLineFromCart} refreshData={this.refreshData} />} />
            </React.Fragment>
          }
          <Route exact path="/profile" render={ routerProps => <UserProfile {...routerProps} getUser={this.getUser} />} />
          <Route exact path="/products" render={ routerProps => <Products {...routerProps} />} />
          <Route exact path="/product/:id" render={ routerProps => <ProductPage {...routerProps} products={this.state.products} addToCart={this.addToCart} cart={this.state.cart} user={this.state.user} getUser={this.refreshData} />} />
          <Route exact path='/help' render={ routerProps => <Help {...routerProps} /> } />
          <Route exact path='/reviews/:id' render={ routerProps => <Review {...routerProps} user={this.state.user} refreshData={this.refreshData}  /> } />
          <Route exact path='/brewery/:id' render={ routerProps => <Brewery {...routerProps} user={this.state.user} getUser={this.getUser} products={this.state.products} /> } />
        </Container>
      </Router>
    )
    return (
      <Router>
        <ToastContainer containerId={'messages'} position={toast.POSITION.BOTTOM_RIGHT} />
        <NavBar />
        
        <Container style={{ paddingTop: '6em' }}>
          <Route exact path="/" render={ routerProps => <SignIn getUser={this.getUser} {...routerProps} />} />
          <Route exact path="/signin" render={ routerProps => <SignIn getUser={this.getUser} {...routerProps} />} />
          <Route exact path="/signup" render={ routerProps => <SignUp getUser={this.getUser} {...routerProps} />} />
        </Container>
      </Router>
    )
  }
}
