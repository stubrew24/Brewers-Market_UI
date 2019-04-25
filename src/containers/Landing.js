import React from 'react';
import Hero from '../components/Hero'
import CardBar from '../components/CardBar'

export default class Landing extends React.Component {

  render(){
    return (
        <React.Fragment>
          <Hero /> 
            {
              this.props.search
              ?
                <CardBar title="Search Results" products={this.props.products} />
              :
                <React.Fragment>
                  <CardBar title="Trending Products" products={this.props.products.slice(0,5)} />
                  <CardBar title="Latest Products" products={this.props.products.reverse().slice(0,5)} />
                </React.Fragment>
            }
        </React.Fragment>
    )
  }
}
