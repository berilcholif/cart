import Product from '../components/Product.vue';
import Cart from '../components/Cart.vue';
import TableAll from '../components/TableAll.vue';

export const routes = [
    {
        path: '/Product',
        name: 'Product',
        component: Product
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/',
        name: 'TableAll',
        component: TableAll
    }
]
