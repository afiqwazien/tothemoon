import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { database } from '@/lib/firebase';
import { ref, update } from 'firebase/database';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');

    // Read the body as text to preserve exact data sent by Billplz
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);
    const data: Record<string, string> = {};
    const receivedSignature = params.get('x_signature');

    params.forEach((value, key) => {
      if (key !== 'x_signature') {
        data[key] = value;
      }
    });

    const xSignatureKey = process.env.BILLPLZ_X_SIGNATURE;
    if (!xSignatureKey || !receivedSignature) {
      return NextResponse.json({ error: 'Missing signature configuration' }, { status: 400 });
    }

    // Standard Billplz V4 Signature: keyvalue|keyvalue sorted alphabetically
    // We exclude 'order_id' as it's a custom query parameter, not part of the POST body data.
    const signatureKeys = Object.keys(data).filter(k => k !== 'order_id').sort();
    const sourceString = signatureKeys.map(key => `${key}${data[key]}`).join('|');

    const computedSignature = crypto
      .createHmac('sha256', xSignatureKey)
      .update(sourceString)
      .digest('hex');

    const matched = computedSignature === receivedSignature;
    const isSandbox = process.env.BILLPLZ_SANDBOX === 'true';
    
    // Security check: Match signature OR allow if in sandbox for development
    if (!matched && !isSandbox) {
      console.error('Invalid Billplz Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    if (!matched && isSandbox) {
      console.warn('⚠️ Billplz Signature mismatch, but allowing due to SANDBOX mode.');
    }

    // Payment is verified
    const isPaid = data.paid === 'true';
    const billId = data.id;

    if (isPaid && orderId) {
      console.log(`✅ Payment Success for Order ${orderId}`);
      
      // Update order status in Firebase
      const orderRef = ref(database, `orders/${orderId}`);
      await update(orderRef, {
        status: "paid",
        billplzId: billId,
        paidAt: new Date().toISOString()
      });
    }

    return new Response('OK', { status: 200 });
  } catch (error: any) {
    console.error('Webhook Processing Error:', error.message);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
