import React from 'react'
import { Table, Button, Header, Modal, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Checkout from './Checkout';
import {API_BASE} from '../API'
import { toast } from 'react-toastify';


export default class Cart extends React.Component {

    state = {
        checkout: false,
        products: [],
        cartItems: []
    }

    componentDidMount(){
        this.cartToState()
    }  

    cartToState = () => {
        let productsArr = []
        fetch(API_BASE + 'products')
            .then(resp => resp.json())
            .then(products => {
                productsArr = products
                this.setState({
                    products: productsArr,
                    cartItems: this.newCartItems(productsArr)
                })
            })
    }
    
    removeFromCart = (id) => {
        this.props.removeFromCart(id)
        this.cartToState()
      }

    newCartItems = (products) => {
        const cartArr = products.filter(product => Object.keys(this.props.cart).includes(product.id.toString()))
        return cartArr.map(cartItem => Object.assign({}, cartItem, { qty: this.props.cart[cartItem.id], total: cartItem.price * this.props.cart[cartItem.id] }))
    }

    sumTotal = (inital = 0) => {
        let meh = inital
        this.state.cartItems.map(item => meh += item.total)
        return parseFloat(meh).toFixed(2)
    }

    checkoutClick = () => {
        this.setState({ checkout: true })
    }

    updateCart = (action, id) => {
       if (action === 'add') {
            const product = this.state.products.find(product => {
               return product.id === id
            })
            console.log(this.props.cart[id], product.stock)
            if (this.props.cart[id] < product.stock) {
                this.props.addToCart(id)
            } else {
                toast.error('Stock level reached.', {containerId: 'messages'})
            } 
        }
       if (action === 'remove') {this.props.removeFromCart(id)}
       if (action === 'removeline') {this.props.removeLineFromCart(id)}

       this.cartToState()
    }

    render() {
        if (this.state.cartItems.length > 0) return (
            <React.Fragment>
                <Header textAlign={'center'} size={'huge'}>My Cart</Header>
                <Table singleLine striped fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Item</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                            <Table.HeaderCell width={2}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                                    
                    <Table.Body>
                        {
                            this.state.cartItems.map(item => {
                                return (
                                        <Table.Row key={item.id}>
                                            <Table.Cell><Link to={`/product/${item.id}`}>{item.name}</Link> <em>({item.brewery.name})</em></Table.Cell>
                                            <Table.Cell>
                                                <Link to={'#'} onClick={() => this.updateCart('remove', item.id)}> <Icon name={'minus'} /> </Link>
                                                    <span style={{fontSize: '1.2em'}}>{item.qty}</span>
                                                <Link to={'#'} onClick={() => this.updateCart('add', item.id)}> <Icon name={'plus'} /> </Link>
                                            </Table.Cell>
                                            <Table.Cell>£{(item.total).toFixed(2)}</Table.Cell>
                                            <Table.Cell><Link to={'#'} style={{color:'red'}} onClick={() => this.updateCart('removeline', item.id)}>Remove</Link></Table.Cell>
                                        </Table.Row>
                                )
                            })
                        }
                        <Table.Row>
                            <Table.Cell /><Table.Cell><strong>Subtotal</strong></Table.Cell><Table.Cell><strong>£{this.sumTotal()}</strong></Table.Cell><Table.Cell />
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell /><Table.Cell>Delivery</Table.Cell><Table.Cell>£{6.99}</Table.Cell><Table.Cell />
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell /><Table.Cell><strong>Total</strong></Table.Cell><Table.Cell><strong>£{this.sumTotal(6.99)}</strong></Table.Cell><Table.Cell />
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Modal trigger={<Button positive floated={'right'} style={{height:'2.8em'}}>Checkout</Button>}>
                                    <Modal.Header>Complete Purchase</Modal.Header>
                                    <Modal.Content>
                                        <Checkout cart={this.state.cartItems} clearCart={this.props.clearCart} user={this.props.user} history={this.props.history} total={this.sumTotal(6.99)}/>
                                    </Modal.Content>
                                </Modal>

                                <Button negative floated={'right'} onClick={this.props.clearCart} as={Link} to={'/'} style={{height:'2.8em'}}>Empty Cart</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

            </React.Fragment>
        ) 
        if (this.state.cartItems.length < 1) return (
            <React.Fragment>
                <Header textAlign={'center'} size={'huge'}>My Cart</Header>

                <br/>

                <Card fluid>
                    <Card.Content>
                        <Card.Header>Cart is empty.</Card.Header>
                        <Card.Description><Link to="/">Click Here </Link> to continue shopping.</Card.Description>
                    </Card.Content>
                </Card>
            </React.Fragment>
        )
    }
}