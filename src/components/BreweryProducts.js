import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Item, Button, Header } from 'semantic-ui-react';
import { API_BASE } from '../API';

export default class BreweryProducts extends React.Component {

    state = {
        products: []
    }

    componentDidMount(){
        fetch(API_BASE + `products`)
            .then(resp => resp.json())
            .then(response => {
                return response.filter(product => product.brewery.id === this.props.brewery.id)
            })
            .then(products => this.setState({products}))
    }

    render(){
        const {products} = this.state
        return(
            <React.Fragment>
                <Header textAlign='center' size='huge'>Manage Products</Header>
                <Segment>
                    <Item.Group>
                        <Item style={{padding:'1em 0'}}>
                            <Button positive as={Link} to={'/brewery/newproduct'}>Add Product</Button>
                        </Item>
                        {products.map(product => {
                            return (
                                <Item style={{padding:'1em 0', borderBottom: '1px solid rgba(0,0,0,0.1)'}} key={product.id}>
                                    <Item.Image size='tiny' src={product.image_url} />
                                    <Item.Content>
                                        <Item.Header>{product.name}</Item.Header>
                                        <Item.Meta>{product.brewery_name}</Item.Meta>
                                        <Item.Description>
                                            Stock: {product.stock}<br />
                                            Price: £{(product.price).toFixed(2)}
                                            <Button floated={'right'} as={Link} to={`/brewery/products/${product.id}`}>Update</Button>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            )
                        })}
                    </Item.Group>
                </Segment>
            </React.Fragment>
        )
    }
}