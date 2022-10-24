import axios from "axios";
import { times } from "lodash";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allProduct: [
            {
                id: 1,
                nama: "Indomie Goreng",
                tipe: "Indomie Goreng Yang Biasa Dimakan Masyarakat Umum",
                qty: 20,
                carts_qty: 0,
                price: 3000,
                carts_price: 0,
                
            },
            {
                id: 2,
                nama: "Indomie Goreng Soto",
                tipe: "Indomie Goreng Variasi Soto",
                qty: 15,
                carts_qty: 0,
                price: 3000,
                carts_price: 0,
              
            },
            {
                id: 3,
                nama: "Indomie Goreng Kaki sapi",
                tipe: "Indomie Goreng Variant Kaki Sapi",
                qty: 999,
                carts_qty: 0,
                price: 3500,
                carts_price: 0,
               
            }
        ],
        carts: [],
        totalCartsQty: 0,
        totalPrice: 0
    },
    getters: {
        getAllProduct(state) {
            return state.allProduct
        },
        getCarts(state) {
            return state.carts
        },
        getTotalCartsQty(state) {
            return state.totalCartsQty
        },
        getTotalPrice(state) {
            return state.totalPrice
        }
    },
    mutations: {
        addToCart(state, id) {
            let produk = state.allProduct.find((item) => item.id == id);
            let cart = state.carts.find((item) => item.idProduk == id);

            produk.carts_qty++;
            produk.qty--;
            state.totalCartsQty++;

            if (!cart) {
                let cartItems = {
                    idProduk: produk.id,
                    nama: produk.nama,
                    tipe: produk.tipe,
                    price: produk.price,
                    img_url: produk.img_url,
                    qty: 1,
                    subTotal: produk.price,
                };
                state.carts.push(cartItems);
            } else {
                cart.qty++;
                cart.subTotal = cart.qty * cart.price;
            }
        },

        removeFromCart(state, id) {
            let produk = state.allProduct.find((item) => item.id == id);

            if (state.totalCartsQty > 0) {
                state.totalCartsQty--;
            } else {
                state.totalCartsQty = 0;
            }
            produk.qty++;
            produk.carts_qty--;

            state.carts.forEach((cart) => {
                if (cart.idProduk == id) {
                    if (cart.qty === 0) {
                        state.carts.splice(state.carts.indexOf(cart), 1);
                        console.log(cart.subTotal)
                    } else {
                        cart.qty -= 1;
                        cart.subTotal = cart.qty * cart.price;
                    }
                }
            });

        },

        triggerCheckout(state) {
            state.carts.forEach((cart) => {
                state.totalPrice += cart.subTotal;
            });
        }
    },
    actions: {
        getList(context) {
            let url = 'api/get_product'
            axios.get(url).then((response) => {
                context.commit('UPDATE_TODO', response.data)
            })
        },
        addToCart(id) {
            this.$store.commit("addToCart", id)
        },
        removeFromCart(id) {
            this.$store.commit("removeFromCart", id)
        },
        triggerCheckout(id) {
            this.$store.commit("triggerCheckout")
        }
    },
    modules: {

    }
})