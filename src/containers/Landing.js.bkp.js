import React from 'react';
import Hero from '../components/Hero'
import CardBar from '../components/CardBar'

export default class Landing extends React.Component {

  render(){
    return (
        <React.Fragment>
          <Hero setFilter={this.props.setFilter} /> 
            {
              this.props.filter
              ?
                <CardBar title={this.props.filter} products={this.props.products} fetchProduct={()=>{}} />
              :
                <React.Fragment>
                  <CardBar title="Trending Products" products={this.props.products.slice(0,5)} fetchProduct={()=>{}}  />
                  <CardBar title="Latest Products" products={[...this.props.products].reverse().slice(0,5)} fetchProduct={()=>{}}  />
                </React.Fragment>
            }
        </React.Fragment>
    )
  }
}
