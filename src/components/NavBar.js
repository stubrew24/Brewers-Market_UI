import React from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react'

export default class NavBar extends React.Component {

    render() {
        const user = this.props.user
        return (
            <Menu fixed="top" inverted >
                <Menu.Item header>
                    Brewers Market
                </Menu.Item>

                    {user &&
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Input placeholder="Search..." action={{ icon: 'search' }} value={this.props.search} onChange={this.props.setSearch} />
                            </Menu.Item>
                            
                            <Dropdown item text={`${user.first_name} ${user.last_name}`}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.props.updateBtn}>My Details</Dropdown.Item>
                                    <Dropdown.Item>Orders</Dropdown.Item>
                                    <Dropdown.Item>Help</Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.signOut}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>    
                    } 
            </Menu>
        )
    }
}
