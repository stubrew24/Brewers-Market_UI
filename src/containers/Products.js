import React from 'react'
import {API_BASE} from '../API'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import { Header, Card } from 'semantic-ui-react'

export default class Products extends React.Component {

    state = {
        products: []
    }

    componentDidMount(){
        fetch(API_BASE + '/products')
            .then(resp => resp.json())
            .then(products => this.setState({ products }))
    }

    render(){

        return (
            <React.Fragment>
                <Hero /> 
                <Header>All Products</Header>
                {this.state.products.length > 0 
                    ?
                        <Card.Group itemsPerRow={5}>
                            {this.state.products.map(product => <ProductCard key={product.id} beer={product}/> )}
                        </Card.Group>
                    :
                        <div>No results found.</div>
                }
            </React.Fragment>
        )
    }
}