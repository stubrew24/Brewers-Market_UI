import React from 'react'
import { Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'


export default class Checkout extends React.Component {

    render(){
        return(
            <StripeProvider apiKey="pk_test_K2Po5Cn1KTtLBFtjiG11Z6Mp">
                <div className="example">
                    <Elements>
                        <CheckoutForm cart={this.props.cart} clearCart={this.props.clearCart} user={this.props.user} history={this.props.history} total={this.props.total} refreshData={this.props.refreshData} />
                    </Elements>
                </div>
            </StripeProvider>
        )
    }
}