import React, { Component } from 'react'
import Product from './Product';
import Title from './Title';
/* import styled from 'styled-components'; */
import { ProductConsumer } from '../context';

export default class ProductList extends Component {



    render() {

        return (

            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="merchandise"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {(productValue) => {
                                    return productValue.products.map(product => {
                                        return <Product key={product.id} product={product}
                                        />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            //   <Product />


        )
    }
}