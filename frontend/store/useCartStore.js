import {create} from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { cartItemsCheck } from '@/utils/cart.js';
import {axiosPost} from "@/utils/dataFetch";
import Swal from "sweetalert2";

const initialState = {
    cartList: [],
    totalPrice: 0,
    orderInfo:{
        name:'',
        mobile:'',
        email:'',
        postcode:'',
        address:'',
    },
    receiverInfo:{
        name:'',
        mobile:'',
        postcode:'',
        address:'',
        isSame: false
    }
}
const useCartStore = create(
    immer((set,get)=>({
        ...initialState,
        addCartItem: (cartItem) => set((state)=>{
            state.cartList = cartItemsCheck(state.cartList, cartItem);
        }),
        showCartItem: (items) => set((state) => {
            state.cartList = items;
            if(items && items.length > 0){
                const userInfo = items[0];
                state.totalPrice = userInfo.totalPrice;
                state.orderInfo = {
                    name : userInfo.uname || '',
                    mobile : userInfo.uphone || '',
                    email : userInfo.uemail || '',
                    postcode: userInfo.postcode || '',
                    address : userInfo.uaddress || ''
                };
            } else {
                state.totalPrice = 0;
                state.orderInfo = {name:'',mobile:'',email:'',postcode:'',address:''}
            }
        }),
        updateTotalPrice: () => set((state) => {
            state.totalPrice = state.cartList
                .filter(item => item.checked === true)
                .reduce((total, item) => total + (item.qty * item.price),0)
        }),
        checkCartItem: (cid) => set((state) => {
            state.cartList = state.cartList.map(item =>
                item.cid === cid ? {...item, checked : !item.checked} : item
            );
        }),
        updateCartItem: (cid, type) => set((state) => {
            state.cartList = state.cartList.map((item)=>
                item.cid === cid ?
                    type === '+' ? {...item, qty: item.qty+1}
                        :item.qty > 1 ? {...item, qty: item.qty-1} : item
                    :item
            );
        }),
        removeCartItem: (cid) => set((state) => {
            state.cartList = state.cartList.filter(item => !(item.cid === cid));
        }),
        clearCart: () => set((state) => {
            state.cartList = [];
            state.totalPrice = 0;
        }),
        setOrderInfo: (name,value) => set((state) => {
            state.orderInfo[name] = value;
            if(state.receiverInfo.isSame){
                state.receiverInfo[name] = value;
            }
        }),
        setReceiverInfo: (name,value) => set((state) => {
            state.receiverInfo[name] = value;
        }),
        toggleSameOrderer: (isSame) => set((state) => {
            state.receiverInfo.isSame = isSame;
            if(isSame){
                state.receiverInfo.name = state.orderInfo.name;
                state.receiverInfo.mobile = state.orderInfo.mobile;
                state.receiverInfo.postcode = state.orderInfo.postcode;
                state.receiverInfo.address = state.orderInfo.address;
            } else {
                state.receiverInfo.name = '';
                state.receiverInfo.mobile = '';
                state.receiverInfo.postcode = '';
                state.receiverInfo.address = '';
            }
        }),
        checkItem: async(cid) => {
            const url = "http://localhost:9000/cart/toggleCheck";
            const data = {"cid": cid};
            await axiosPost(url, data);
            const{checkCartItem,updateTotalPrice} = get();
            checkCartItem(cid);
            updateTotalPrice();
        },
        addCart: async(pid) => {
            // const {userId} = JSON.parse(localStorage.getItem("loginInfo"));
            const  userId  = "test111";
            const url = "http://localhost:9000/cart/add";
            const data = {"product_id": Number(pid), "qty": 1, "checked": true, "uid": userId};

            const response = await axiosPost(url, data);
            if (response) {
                await Swal.fire({
                    icon: "success",
                    title: "",
                    text: "장바구니에 상품이 추가되었습니다!",
                });
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "",
                    text: "장바구니 추가에 실패했습니다.",
                });
            }
        },
        updateCart: async(cid,type) => {
            const url = "http://localhost:9000/cart/updateCart";
            const data = {"cid":cid,"type":type};
            const rows = await axiosPost(url,data);
            const {updateCartItem, updateTotalPrice} = get();
            updateCartItem(cid,type);
            updateTotalPrice();
        },
        removeCart: async (cid) => {
            const url = "http://localhost:9000/cart/delete";
            const data = {"cid":cid};
            const rows = await axiosPost(url,data);
            const { removeCartItem, updateTotalPrice } = get();
            removeCartItem(cid);
            updateTotalPrice();
        }
    }))
)

export default useCartStore;
