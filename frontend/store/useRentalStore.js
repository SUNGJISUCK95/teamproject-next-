import { create } from "zustand";

export const useRentalStore = create((set) => ({

  // 상태 (State)

  bikeList: [],
  filteredBikeList: [],
  selectedStation: null,

  // 지도 관련 상태
  latLon: { lat: 37.575877, lng: 126.976897 },
  mapCenter: { lat: 37.575877, lng: 126.976897 },
  showSearchButton: false,

  paymentDetails: { rentalTime: 0, calculatedPrice: 0 },


  // 액션 (Actions)
  addData: (payload) =>
    set({
      bikeList: payload,
    }),

  setFilteredList: (payload) =>
    set({
      filteredBikeList: payload,
    }),

  setSelectedStation: (payload) =>
    set({
      selectedStation: payload,
    }),

  setLatLon: (payload) =>
    set({
      latLon: payload,
      mapCenter: payload,
    }),

  setMapCenter: (payload) =>
    set({
      mapCenter: payload,
    }),

  setShowSearchButton: (payload) =>
    set({
      showSearchButton: payload,
    }),

  setPaymentDetails: (payload) =>
    set({
      paymentDetails: payload,
    }),
}));