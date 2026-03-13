import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, Tour, Guide } from '@/types';

const initialState: BookingState = {
  selectedTour: null,
  selectedDate: null,
  selectedGuide: null,
  selectedLanguage: 'Español',
  participants: 1,
  isModalOpen: false,
  guestName: '',
  guestEmail: '',
  guestPhone: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedTour(state, action: PayloadAction<Tour>) {
      state.selectedTour = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      state.selectedGuide = null; // reset guide when date changes
    },
    setSelectedGuide(state, action: PayloadAction<Guide>) {
      state.selectedGuide = action.payload;
    },
    setSelectedLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload;
    },
    setParticipants(state, action: PayloadAction<number>) {
      state.participants = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    setGuestInfo(
      state,
      action: PayloadAction<{ name: string; email: string; phone: string }>
    ) {
      state.guestName = action.payload.name;
      state.guestEmail = action.payload.email;
      state.guestPhone = action.payload.phone;
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const {
  setSelectedTour,
  setSelectedDate,
  setSelectedGuide,
  setSelectedLanguage,
  setParticipants,
  openModal,
  closeModal,
  setGuestInfo,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;