import React from 'react'
import { Table } from 'semantic-ui-react'

export default class Cart extends React.Component {

    render() {
        const cart = this.props.cart
        const items = [] 
        for(const item in this.props.cart){
            items.push(<Table.Row><Table.Cell>{item}</Table.Cell><Table.Cell>{cart[item]}</Table.Cell><Table.Cell>{item}</Table.Cell></Table.Row>)
        }
        return (

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Qty</Table.HeaderCell>
                        <Table.HeaderCell>Header</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map(item => item)}
                </Table.Body>
            </Table>
        )
    }
}