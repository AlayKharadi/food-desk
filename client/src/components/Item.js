import { Button, Card, CardActions, CardContent, CardMedia, Typography, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import breakfast from "../Images/breakfast.svg";
import { useSelector } from "react-redux";
import { userStore } from '../storage/store';
import { ADDTOCART } from '../storage/actiontype';

const Item = ({ food }) => {

    //button is active or not.
    let cart = useSelector(state => {
        return state.cart.includes(food.item_id);
    })

    //Add the item into the cart
    function AddToCart(e) {
        e.preventDefault();
        userStore.dispatch({
            type: ADDTOCART,
            payload: {
                item_id: food.item_id
            }
        });
    }

    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                src={breakfast}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {food.item_name}
                </Typography>
                <Alert>
                    {food.item_description}
                </Alert>
                <Typography>
                    Price: {food.item_price}
                </Typography>
                <Typography>
                    Shop-Name: {food.shop_name}
                </Typography>
                <Typography>
                    Seller: {food.shop_owner}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    title="Order"
                >
                    <PaidIcon />
                </Button>
                <Button
                    disabled={cart}
                    size="small"
                    variant="contained"
                    title={(cart) ? "Added" : "Add-To-Cart"}
                    onClick={(e) => AddToCart(e)}
                >
                    {(cart) ? <CheckCircleIcon /> : <AddShoppingCartIcon />}
                </Button>
            </CardActions>
        </Card>
    );
}

export default Item;