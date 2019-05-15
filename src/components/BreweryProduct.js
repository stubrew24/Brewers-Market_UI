import React from 'react'
import { API_BASE } from '../API';
import { toast } from 'react-toastify';
import BreweryProductForm from './BreweryProductForm';

export default class BreweryProduct extends React.Component {

    state = {
        product: null
    }

    componentDidMount(){
        fetch(API_BASE + `products/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(product => this.setState({product}))
    }

    updateDetails = (productObj) => {
        fetch(API_BASE + `products/${productObj.id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(productObj)
        })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error) {
                        toast.error(response.error, {containerId: 'messages'})
                    } else {
                        toast.success('Product updated.', {containerId: 'messages'})
                        this.setState({...response})
                        this.props.getUser()
                    }
                })
    }

    render() {
        if (this.state.product) return (
            <React.Fragment>
                <BreweryProductForm title="Product Details" btn="Update Details" product={this.state.product} handleSubmit={this.updateDetails}/>
            </React.Fragment>
        )
        return (<div></div>)
    }
}