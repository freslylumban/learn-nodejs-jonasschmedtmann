/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_vIWzr9Q3pNt6Yay2dYNhoUYZ00SAYvJ7Ya');

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API endpoint
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2. Create checkout form + charger credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
