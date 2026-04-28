import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const prerender = false;

const TIME_ZONE = 'America/Bogota';
const COLOMBIA_OFFSET = '-05:00';

const buildDateTime = (date: string, time: string) => {
  return new Date(`${date}T${time}:00${COLOMBIA_OFFSET}`);
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, phone, service, date, time, notes } = body;

    if (!name || !phone || !service || !date || !time) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios.' }),
        { status: 400 },
      );
    }

    const calendarId = import.meta.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      return new Response(
        JSON.stringify({ message: 'No se encontró GOOGLE_CALENDAR_ID.' }),
        { status: 500 },
      );
    }

    const auth = new google.auth.JWT({
      email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const startDateTime = buildDateTime(date, time);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDateTime.toISOString(),
        timeMax: endDateTime.toISOString(),
        timeZone: TIME_ZONE,
        items: [{ id: calendarId }],
      },
    });

    const busySlots = freeBusy.data.calendars?.[calendarId]?.busy || [];

    if (busySlots.length > 0) {
      return new Response(
        JSON.stringify({
          message: 'Este horario ya está ocupado en Google Calendar.',
        }),
        { status: 409 },
      );
    }

    const event = {
      summary: `Cita maquillaje - ${name}`,
      description: `
Servicio: ${service}
Nombre: ${name}
WhatsApp: ${phone}
Notas: ${notes || 'Sin notas'}
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: TIME_ZONE,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: TIME_ZONE,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    return new Response(
      JSON.stringify({
        message: 'Evento creado correctamente.',
        eventId: response.data.id,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error creando evento:', error);

    return new Response(
      JSON.stringify({ message: 'Error creando el evento.' }),
      { status: 500 },
    );
  }
};