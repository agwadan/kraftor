import React, { Component } from 'react'
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem]

        })

        this.setState(() => {
            return { products: tempProducts }
        });
    };

    /**UTILITY METHOD THAT GETS THE ITEM BY ID */
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    /**FUNCTION THAT IS CALLED FROM PRODUCT.JS 
     * TO SHOW DETAILS OF A PRODUCT 
    */
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })

    }

    /**Below is the function that handles addition of
     * a product to the cart
     */
    addToCart = (id) => {
        let tempProducts = [...this.state.products]; //Getting access to all the products in the state
        const index = tempProducts.indexOf(this.getItem(id)); //Getting the index of the item. 
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;

        const price = product.price;
        product.total = price; //Assigning the price of the item to the total price to pay for the product

        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };
        }, () => {
            this.addTotals();
        });

    };

    /**FUNCTION TO DISPLAY THE MODAL WHEN AN ITEM IS ADDED TO THE CART */
    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        })
    }


    /**FUNCTION TO CLOSE THE MODAL */
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        })
    }

    /**FUNCTION TO INCREASE THE COUNT OF THE SAME PRODUCT IN THE CART */
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        },
            () => {
                this.addTotals();
            }
        )
    }

    /**FUNCTION TO DECREMENT THE NUMBER OF THE SAME PRODUCT FROM THE CART */
    decrement = (id) => {
        const tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if (product.count === 0) {
            this.removeItem(id);
        } else {

            product.total = product.total - product.price;

            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            },
                () => {
                    this.addTotals();
                })
        }
    }

    /**THE FUNCTION BELOW IS TO REMOVE AN ITEM FROM THE CART */
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id); //Ensuring temporary Cart only has items that dont match the passed in id

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];

        /**Below, the values are reset to default after the item is removed from the cart */
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotals();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        },

            () => {
                this.setProducts(); //All the values of the products are set back to default
                this.addTotals(); //All the calculated totals are reset to 0
            }
        )
    }

    /**THE FUNCTION BELOW DOES ALL THE NECESSARY TOTALINGS 
     * FOR ITEMS ADDED TO THE CART
     */
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total

            }
        });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };