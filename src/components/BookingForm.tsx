
import BookingFormContainer from "./booking/BookingFormContainer";

interface BookingFormProps {
  price: number;
  currency: string;
  maxGuests: number;
  bedrooms: number;
  onClose?: () => void;
  stayId: string;
  stayName: string;
  stayLocation: string;
  stayImage: string;
}

const BookingForm = (props: BookingFormProps) => {
  return <BookingFormContainer {...props} />;
};

export default BookingForm;
