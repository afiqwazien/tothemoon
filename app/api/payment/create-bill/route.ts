import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { name, email, amount, description, orderId } = await request.json();

    // Server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Billplz uses Basic Auth with API Key as username and no password
    const auth = Buffer.from(`${process.env.BILLPLZ_API_KEY}:`).toString('base64');

    // Billplz amount is in cents (RM 1.00 = 100)
    const billAmount = Math.round(amount * 100);

    // Determine if using sandbox or production based on .env variable
    const isSandbox = process.env.BILLPLZ_SANDBOX === 'true';
    const billplzUrl = isSandbox 
      ? 'https://www.billplz-sandbox.com/api/v3/bills' 
      : 'https://www.billplz.com/api/v3/bills';

    // Build absolute URLs for callbacks
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    const response = await axios.post(
      billplzUrl,
      {
        collection_id: process.env.BILLPLZ_COLLECTION_ID,
        email: email,
        name: name,
        amount: billAmount,
        callback_url: `${baseUrl}/api/payment/webhook?order_id=${orderId}`,
        description: description,
        redirect_url: `${baseUrl}/payment/success?order_id=${orderId}`,
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ url: response.data.url });
  } catch (error: any) {
    console.error('Billplz Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create bill' },
      { status: 500 }
    );
  }
}
