import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import Swal from "sweetalert2";

const initialState = {
    compareList: []
}

const useCompareStore = create(
    immer((set,get) => ({
        ...initialState,
        addCompareItem: (productToAdd) => set((state) => {
            const isProduct = state.compareList.find(item =>
                item.pid.toString() === productToAdd.pid.toString() &&
                item.category === productToAdd.category
            );
            if(!isProduct){
                state.compareList.push({...productToAdd, checked:false});
            }
        }),
        removeCompareItem: (pid,category) => set((state) => {
            state.compareList = state.compareList.filter(item =>
            !(item.pid.toString() === pid.toString() && item.category === category))
        }),
        toggleCompareItem: (pid, category) => set((state) => {
            const checkedCount = state.compareList.filter(item => item.checked === true).length;
            const toggleItem = state.compareList.find(item =>
                item.pid.toString() === pid.toString() && item.category === category
            );
            if (checkedCount < 3 || toggleItem.checked) {
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
        })
    }))
)

export default useCompareStore;