import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'

export default class ProductCard extends React.Component{
    render(){
        const {brewery, name, style, image_url} = this.props.beer
        return (
            <Card>
                <Image src={image_url} />
                <Card.Content>
                    <Header>{brewery.name}</Header>
                    <p>{name}</p>
                </Card.Content>
                <Card.Content extra>
                    {style}
                </Card.Content>
            </Card>
        )
    }
}