import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import ProductCard from './ProductCard'

export default class CardBar extends React.Component {

    render(){
        return (
            <React.Fragment>
                <Header>{this.props.title}</Header>
                {this.props.products.length > 0 
                    ?
                        <Card.Group itemsPerRow={5}>
                            {this.props.products.map(product => <ProductCard key={product.id} beer={product}/> )}
                        </Card.Group>
                    :
                        <div>No results found.</div>
                }
            </React.Fragment>
        )
    }
}