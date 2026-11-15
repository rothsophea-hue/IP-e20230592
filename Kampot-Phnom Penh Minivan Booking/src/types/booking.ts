export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

export interface Booking {
  id: string;
  tripId: string;
  passengerName: string;
  passengerPhone: string;
  seatsBooked: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED';
}