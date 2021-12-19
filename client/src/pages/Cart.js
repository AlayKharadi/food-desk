import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, Container, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import { userStore } from '../storage/store';
import { REMOVE_FROM_CART } from '../storage/actiontype';
import empty_cart from '../Images/empty_cart.svg';

const Cart = () => {
    let cart = useSelector(state => state.cart);

    const [coupon, setCoupon] = useState("");

    function EditCoupon(e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z]*$/;
        if (pattern.test(e.target.value)) {
            setCoupon(e.target.value);
        }
    }

    if (cart.length === 0) {
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} component="h4">
                        Cart is Empty
                    </Grid>
                    <Grid item xs={12}>
                        <img src={empty_cart} placeholder="Empty cart" width="200vw"/>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++){
        total = total + (cart[i].price * cart[i].quantity);
    }

    return (
        <div className="single">
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row">
                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Items</div>
                            <div className="p-4">
                                <Grid container spacing={2}>
                                    {
                                        cart.map((item, index) => {
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    key={index}
                                                >
                                                    <Alert
                                                        severity="info"
                                                        action={
                                                            <IconButton
                                                                aria-label="close"
                                                                color="inherit"
                                                                size="small"
                                                                onClick={() => {
                                                                    userStore.dispatch({
                                                                        type: REMOVE_FROM_CART,
                                                                        payload: {
                                                                            id: item.id
                                                                        }
                                                                    });
                                                                    window.localStorage.setItem("cart", JSON.stringify(userStore.getState().cart));
                                                                }}
                                                            >
                                                                <CloseIcon fontSize="inherit" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <AlertTitle>
                                                            <b>Product</b>: {item.name}
                                                        </AlertTitle>
                                                        <p className="mb-0">
                                                            Shop-Keeper: {item.shop_owner}
                                                        </p>
                                                        <p className="mb-0">
                                                            Price: {item.price}
                                                        </p>
                                                        <p className="mb-0">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </Alert>
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            </div>
                        </div>
                    </div>

                    <div className="row py-5 p-4 bg-white rounded shadow-sm">
                        <div className="col-lg-6">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Coupon code</div>
                            <div className="p-4">
                                <p className="mb-4"><em>If you have a coupon code, please enter it in the box below</em></p>
                                <div className="input-group mb-4 border rounded-pill p-2">
                                    <input
                                        type="text"
                                        placeholder="Apply coupon"
                                        aria-describedby="button-addon3"
                                        className="form-control border-0"
                                        value={coupon}
                                        onChange={(e) => EditCoupon(e)}
                                    />
                                    <div className="input-group-append border-0">
                                        <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill" title="Coupon">
                                            <LocalMallTwoToneIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                            <div className="p-4">
                                <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Order Subtotal</strong>
                                        <strong>{total}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Shipping and handling</strong>
                                        <strong>10.00</strong>
                                    </li>
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Tax</strong>
                                        <strong>0.00</strong>
                                    </li>
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Total</strong>
                                        <h5 className="fw-bold">{total + 10}</h5>
                                    </li>
                                </ul>
                                <Link className="btn btn-dark rounded-pill py-2 d-md-block" to='/Checkout'>Procceed to checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart;