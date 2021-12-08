import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ContentButton} from './Button';

export default class Details extends Component {
    render() {
        return (
            
            <ProductConsumer>

                {(value) => {

                    /**DESTRUCTURING THE ARRAY CONTAINIG PRODUCT DETAILS */
                    const {id, company, img, info, price, title,  inCart} = value.detailProduct;

                    return (
                        <div className="container py-5">
                            {/*Title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>
                                        {title}
                                    </h1>

                                </div>
                            </div>
                            {/**End title */}
                            
                            {/**Product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <img  src={img} className="img-fluid" alt="product"/>
                                </div>

                                {/**Product description */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h1>Model: {title}</h1>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Made by: <span className="text-uppercare">
                                            {company}
                                        </span>
                                    </h4>

                                    <h4>
                                        <strong>
                                            Price: {price.toLocaleString()} <span>UGX</span>
                                        </strong>
                                    </h4>
                                    
                                    <h4 className="text-capitalize font-weight-bold mt-3 mb-0">Details  </h4>
                                    <p className=" text-muted">
                                        {info}
                                    </p>

                                    {/**Buttons */}
                                    <div>
                                        <Link to="/">
                                            <ContentButton>
                                                back to products
                                            </ContentButton>
                                        </Link>

                                        {" "}

                                        <ContentButton cart disabled={inCart? true : false} onClick = {()=>{
                                                value.addToCart(id);
                                                value.openModal(id);
                                            }}>
                                            {inCart? "inCart" : "add to cart"}
                                            
                                        </ContentButton>
                                    </div>

                                </div>

                            </div>

                        </div>
                    )

                }}

            </ProductConsumer>
            
        );
    }
}
