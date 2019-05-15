import React from 'react'
import { API_BASE } from '../API';
import { toast } from 'react-toastify';
import BreweryProductForm from './BreweryProductForm';

export default class BreweryNewProduct extends React.Component {

    createProduct = (productObj) => {
        fetch(API_BASE + `products`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({...productObj, brewery_id: this.props.brewery.id})
        })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error) {
                        toast.error(response.error, {containerId: 'messages'})
                    } else {
                        toast.success('Product saved.', {containerId: 'messages'})
                        this.props.getUser()
                        this.props.history.push(`/product/${response.id}`)
                    }
                })
    }

    render() {
        return (
            <BreweryProductForm title="New Product" btn="Create Product" handleSubmit={this.createProduct} />
        )
    }
}