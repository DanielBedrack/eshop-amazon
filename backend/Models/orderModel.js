import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        token: { type: String, require: true },
        title: { type: String, require: true },
        quantity: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          require: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: false },
      country: { type: String, require: true },
      location: {
        lat: Number,
        lan: Number,
        address: String,
        name: String,
        vicinity: String,
        googleAddressId: String,
      },
      paymentMethod: { type: String, require: true },
      paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
      },
      itemsPrice: { type: Number, require: true },
      shippingPrice: { type: Number, require: true },
      taxPrice: { type: Number, require: true },
      totalPrice: { type: Number, require: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
      },
      isPaid: { type: Boolean, require: true },
      paidAt: { type: Date },
      isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date },
    },
  },
  { timestamp: true }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
