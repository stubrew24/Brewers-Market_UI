import React from 'react'
import { Image, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../API'
import { styles } from '../constants'


export default class Hero extends React.Component{  

    state = {
        activeItem: 'home',
        breweries: []
    }

    componentDidMount(){
        
        fetch(API_BASE + 'breweries')
          .then(resp => resp.json())
          .then(breweries => this.setState({breweries}))
      }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    breweries = () => {
        const b = this.state.breweries.filter(brewery => brewery.products.length > 0)
        return b.map(brewery => {
            return {text: brewery.name, value: brewery.name}
        })
    }

    styles = () => {
        return styles.map(style => {
            return {text: style, value: style}
        })
    }

    setFilterButton = (type, value=null) =>{
        this.setState({ activeItem: type || 'home' })
        this.props.setFilter(type, value)
    }

    setFilterDropdown = (e, {name, value}) => {
        this.setState({ activeItem: name })
        this.props.setFilter(name, value)
    }
    stickTopMenu = () => this.setState({menuFixed: true})

    unStickTopMenu = () => this.setState({menuFixed: false})

    render(){

        const { activeItem } = this.state

        return (
            <React.Fragment>
                <div style={{width: '100%', height: '14em', overflow: 'hidden', borderRadius: '5px', boxShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
                    <Image src={'https://stuartsewell.dev/hero2.jpeg'} style={{ objectFit: 'cover', height: '14em', width: '100%'}}/>
                </div>

                <div>
                    <Menu pointing secondary>
                        <Menu.Item 
                            as={Link} 
                            to={'/'} 
                            name='home'
                            active={activeItem === 'home'}
                            onClick={() => this.setFilterButton(null)}
                        />
                        <Menu.Item 
                            name='all products'
                            active={activeItem === 'all products'}
                            onClick={() => this.setFilterButton('all products', 'All Products')}
                        />
                        <Dropdown 
                            item 
                            name="brewery"
                            onChange={this.setFilterDropdown} 
                            text="Filter by Brewery" 
                            options={this.breweries()}
                        />
                        <Dropdown 
                            item 
                            name="style"
                            onChange={this.setFilterDropdown} 
                            text="Filter by Style" 
                            options={this.styles()}
                        />

                    </Menu>
                </div>
            </React.Fragment>
        )
    }
}