// This API route will receive webhook events from Clerk,
// process them, and synchronize user data to your NeonDB.

import { WebhookEvent } from '@clerk/nextjs/server'; // Clerk webhook event types
import { Webhook } from 'svix'; // For verifying webhook signatures
import { headers } from 'next/headers'; // Next.js utility to get request headers
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database'; // Your singleton Prisma client instance

export async function POST(req: Request) {
  // 1. Get the headers from the incoming webhook request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 2. If any of the required headers are missing, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Clerk Webhook Error: Missing Svix headers");
    return new Response('Error occurred -- no Svix headers', { status: 400 });
  }

  // 3. Get the raw request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 4. Retrieve the Clerk webhook secret from your environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Clerk Webhook Error: Missing CLERK_WEBHOOK_SECRET environment variable.");
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  // 5. Create a new Svix instance with your secret for verification
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // 6. Verify the webhook payload's signature
  //    This step is crucial to ensure the webhook originated from Clerk and has not been tampered with.
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Clerk Webhook Error: Verification failed.', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // 7. Extract the event type and data
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Clerk Webhook Event Received: ${eventType} for user ID: ${id}`);

  // 8. Handle the specific event types
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;

    // Extract primary email and phone number if available
    const email = email_addresses?.[0]?.email_address || null;
    const name = `${first_name || ''} ${last_name || ''}`.trim() || username || 'New User'; // Prioritize first/last name, then username, then fallback

    try {
      // Create a new user record in your NeonDB
      await prisma.user.create({
        data: {
          id: id, // Use Clerk's user ID as your Prisma user's primary ID
          email: email,
          name: name,
          profile_picture_url: image_url || null,
          // Any other fields you want to sync immediately
          // bio: public_metadata?.bio as string || null, // Example: if you store bio in Clerk's public_metadata
          // interests: public_metadata?.interests as string[] || [], // Example for array type
          // occupation: public_metadata?.occupation as string || null,
          // birth_date: public_metadata?.birth_date ? new Date(public_metadata.birth_date as string) : null,
          // gender: public_metadata?.gender as string || null,
        },
      });
      console.log(`User ${id} (${name}) created in NeonDB.`);
      return NextResponse.json({ message: "User created in DB" }, { status: 201 });
    } catch (dbError) {
      console.error(`Clerk Webhook Error: Failed to create user ${id} in NeonDB:`, dbError);
      // Return a 500 status if DB operation fails
      return NextResponse.json({ message: "Failed to create user in DB" }, { status: 500 });
    }
  }
  // Optional: Implement handlers for 'user.updated' and 'user.deleted' to keep your DB in sync
  else if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
      const email = email_addresses?.[0]?.email_address || null;
      const name = `${first_name || ''} ${last_name || ''}`.trim() || username || 'User';

      try {
          await prisma.user.update({
              where: { id: id },
              data: {
                  email: email,
                  name: name,
                  profile_picture_url: image_url || null,
                  // bio: public_metadata?.bio as string || null,
                  // interests: public_metadata?.interests as string[] || [],
                  // occupation: public_metadata?.occupation as string || null,
                  // birth_date: public_metadata?.birth_date ? new Date(public_metadata.birth_date as string) : null,
                  // gender: public_metadata?.gender as string || null,
                  updated_at: new Date(),
              },
          });
          console.log(`User ${id} (${name}) updated in NeonDB.`);
          return NextResponse.json({ message: "User updated in DB" }, { status: 200 });
      } catch (dbError) {
          console.error(`Clerk Webhook Error: Failed to update user ${id} in NeonDB:`, dbError);
          return NextResponse.json({ message: "Failed to update user in DB" }, { status: 500 });
      }
  }
  else if (eventType === 'user.deleted') {
      const { id } = evt.data;
      try {
          // It's often better to soft-delete by setting an `is_active` flag
          await prisma.user.update({
              where: { id: id },
              data: { is_active: false, updated_at: new Date() },
          });
          // Or permanently delete:
          // await prisma.user.delete({ where: { id: id } });
          console.log(`User ${id} processed as deleted/soft-deleted in NeonDB.`);
          return NextResponse.json({ message: "User deleted in DB" }, { status: 200 });
      } catch (dbError) {
          console.error(`Clerk Webhook Error: Failed to delete user ${id} in NeonDB:`, dbError);
          return NextResponse.json({ message: "Failed to delete user in DB" }, { status: 500 });
      }
  }

  // For unhandled event types, acknowledge receipt with a 200 OK
  return new Response('OK', { status: 200 });
}