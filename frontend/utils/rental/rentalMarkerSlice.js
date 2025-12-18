import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bikeList : [], // 대여 자전거 전체 데이터의 새 상태
    filteredBikeList: [], // 최종 필터링 목록을 저장할 새 상태
    selectedStation: null, // list 클릭시 정보가 반영될 데이터를 담을 새 상태
    paymentDetails: {rentalTime: 0, calculatedPrice: 0}, // 사용자가 입력한 시간 대비 가격 초기 값 상태
}

export const rentalSlice = createSlice({
    name: 'rentalBike',
    initialState,
    reducers: {
        addData: (state,action) =>{ // rentalMarker.json
            state.bikeList = [...state.bikeList, ...action.payload];
        },
        setFilteredList: (state, action) => {
            state.filteredBikeList = action.payload;
        },
        setSelectedStation: (state, action) => {
            state.selectedStation = action.payload;
        },
        setPaymentDetails: (state, action) => {
            state.paymentDetails = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { addData, setFilteredList, setSelectedStation, setPaymentDetails } = rentalSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default rentalSlice.reducer //store import