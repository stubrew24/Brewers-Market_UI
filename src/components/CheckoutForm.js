import React from 'react'
import {Button, Loader} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import { toast } from 'react-toastify';
import { API_BASE } from '../API';

class CheckoutForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {complete: false, data: {}, btnText: 'Complete', btnDisable: false}
        this.submit = this.submit.bind(this)
        this.order_id()
    }

    order_id(){
        fetch(API_BASE + 'ordernum')
            .then(resp=> resp.json())
            .then(response => this.setState({order_id: response.order}))
    }

    async submit (ev) {
        const { error, complete } = this.state.data
        if (error || !complete) {  
            let errorMsg = null
            error ? errorMsg = error.message : errorMsg = 'Form not complete'
            toast.error(errorMsg, {containerId: 'messages'})
            return
        }
        this.setState({btnText: <Loader active inline size='small'/>, btnDisable: true})
    
        let {token} = await this.props.stripe.createToken({name: "Name"});

        let response = await fetch(API_BASE + "charges", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: this.props.user.email, card_token: token.id, total: this.props.total*100, order_id: this.state.order_id})
        });
    
        if (response.ok){

            const cart = JSON.parse(localStorage.getItem('cart'))

            fetch(API_BASE + 'orders', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({cart:cart, user_id: this.props.user.id, order_total: this.props.total})
            })
                    .then(resp => resp.json())
                    .then(response => {
                        if (response.error) {
                            toast.error(response.error, {containerId: 'messages'})
                        } else {
                            localStorage.removeItem('cart')
                            this.props.clearCart()
                            this.props.refreshData()
                            this.props.history.push(`/order/${response.id}`)
                        }   
                    })
        }   
    }

    render(){
        if (this.state.complete) return <h1>Purchase Complete</h1>
        return (
            <div className="checkout">
                <CardElement onChange={data => {
                    this.setState({ data })
                }}/>
                <Button onClick={this.submit} disabled={this.state.btnDisable} positive floated={'right'} style={{marginBottom: '20px'}}>{this.state.btnText}</Button>
            </div>
        )
    }
}

export default injectStripe(CheckoutForm)
