import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

export const navlinks = [
    { id: 0, path: '/Menu', name: 'Menu', target: <Menu /> },
    { id: 1, path: '/Offers', name: 'Offers', target: <Menu /> },
    { id: 2, path: '/Cart', name: 'Cart', target: <Cart /> },
    { id: 3, path: '/Checkout', name: 'Checkout', target: <Checkout /> },
    { id: 4, path: '/Settings', name: 'Settings', target: <Menu /> }
];