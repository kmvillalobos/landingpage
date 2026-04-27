import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { date } = await request.json();

    const auth = new google.auth.JWT({
      email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = import.meta.env.GOOGLE_CALENDAR_ID;

    const startDay = new Date(`${date}T00:00:00-05:00`);
    const endDay = new Date(`${date}T23:59:59-05:00`);

    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDay.toISOString(),
        timeMax: endDay.toISOString(),
        timeZone: 'America/Bogota',
        items: [{ id: calendarId }],
      },
    });

    const busy = freeBusy.data.calendars?.[calendarId]?.busy || [];

    return new Response(JSON.stringify({ busy }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ busy: [] }), { status: 500 });
  }
};