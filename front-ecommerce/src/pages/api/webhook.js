import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';
import { Order } from "@/models/Order";

const endpointSecret = "whsec_feb8e3ee8c3f19100261b52d43675c0273e9842972c9d6f7f36ae9ca0b06afcd";

export default async function handler(req, res) {
  try {
    // Conectar con la base de datos
    await mongooseConnect();
    
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Manejo del evento
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata?.orderId;
        const paid = data.payment_status === 'paid';

        // Verificar si la orden y el pago son correctos
        if (orderId && paid) {
          try {
            const order = await Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
            if (!order) {
              res.status(404).send('Order not found');
              return;
            }
            console.log('Order updated:', order);
          } catch (err) {
            console.error('Error updating order:', err);
            res.status(500).send('Error updating order');
            return;
          }
        } else {
          console.error('Payment not completed or orderId not found');
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
  } catch (err) {
    console.error('Error handling webhook:', err);
    res.status(500).send('Internal Server Error');
  }
}

export const config = {
  api: { bodyParser: false }
};

// zippy-handy-revel-smile
// acct_1QX3VDGPSp3qhsAO