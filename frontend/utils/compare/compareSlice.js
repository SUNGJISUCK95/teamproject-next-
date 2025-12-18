import {createSlice} from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    compareList: []
}

export const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addCompareItem(state, action) {
            const productToAdd = action.payload;
            const isProduct = state.compareList.find(item =>
                item.pid.toString() === productToAdd.pid.toString() &&
                item.category === productToAdd.category
            );
            if (!isProduct) {
                state.compareList.push({...productToAdd, checked: false});
            }
        },
        toggleCompareItem(state, action) {
            const {pid, category} = action.payload;
            const checkedCount = state.compareList.filter(item => item.checked === true).length;
            const toggleItem = state.compareList.find(item =>
                item.pid.toString() === pid.toString() && item.category === category
            );
            if (checkedCount < 2 || toggleItem.checked) {
                state.compareList = state.compareList.map(item =>
                    (item.pid.toString() === pid.toString() && item.category === category)
                        ? {...item, checked: !item.checked}
                        : item
                );
            } else {
                Swal.fire({
                    icon: "info",
                    title: "",
                    text: "최대 3개까지 선택 가능합니다.",
                });
            }
        },
        removeCompareItem(state, action) {
            const {pid, category} = action.payload;
            state.compareList = state.compareList.filter(item =>
                !(item.pid.toString() === pid.toString() && item.category === category)
            );
        }
    }
})


export const {addCompareItem,toggleCompareItem,removeCompareItem} = compareSlice.actions

export default compareSlice.reducer