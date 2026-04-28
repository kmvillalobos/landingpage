import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Heart,
  MessageCircle,
} from 'lucide-react';

const Join = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');
  const [busyTimes, setBusyTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate) return;

      const res = await fetch('/api/get-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate }),
      });

      const data = await res.json();

      const busyHours = data.busy.map((slot: any) => {
        const date = new Date(slot.start);

        return new Intl.DateTimeFormat('es-CO', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(date);
      });

      setBusyTimes(busyHours);
    };

    fetchAvailability();
  }, [selectedDate]);

  const WHATSAPP_NUMBER = '573116836400';

  const availableTimes = Array.from({ length: 24 }, (_, index) => {
    return `${String(index).padStart(2, '0')}:00`;
  });

  const services = [
    'Maquillaje social',
    'Maquillaje para novias',
    'Maquillaje para fotos',
    'Maquillaje para eventos',
    'Asesoría personalizada',
  ];

  const getTodayInColombia = () => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  };

  const today = getTodayInColombia();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !service || !name || !phone) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    const appointment = {
      name,
      phone,
      service,
      date: selectedDate,
      time: selectedTime,
      notes,
      createdAt: new Date().toISOString(),
    };


    const response = await fetch('/api/create-calendar-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });

    const data = await response.json();

    if (response.status === 409) {
      setError('Ese horario ya está ocupado. Por favor elige otro.');
      return;
    }

    if (!response.ok) {
      setError(data.message || 'No se pudo crear la cita en Google Calendar.');
      return;
    }

    const message = `Hola, quiero solicitar una cita de maquillaje.%0A%0ANombre: ${name}%0AWhatsApp: ${phone}%0AServicio: ${service}%0AFecha: ${selectedDate}%0AHora: ${selectedTime}%0AMensaje adicional: ${notes || 'Sin mensaje adicional'}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    setBooked(true);
    setError('');
  };

  return (
    <div className="from-primary/10 via-background to-accent/10 flex min-h-screen flex-col bg-gradient-to-br p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-4xl"
      >
        <a href="/">
          <button className="hover:bg-secondary/20 mb-6 rounded-full p-2 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </a>
      </motion.div>

      <div className="mx-auto flex w-full max-w-4xl flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-card/95 overflow-hidden rounded-[2rem] border-none shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center gap-8 p-8 text-center md:p-12">
              {!booked ? (
                <>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-primary/20 flex h-20 w-20 items-center justify-center rounded-full">
                        <Calendar className="text-primary h-10 w-10" />
                      </div>
                    </div>

                    <h1 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
                      Reserva tu cita
                    </h1>

                    <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed">
                      Agenda tu sesión de maquillaje profesional. Elige el
                      servicio, fecha y horario. Cada cita tiene una duración
                      aproximada de una hora.
                    </p>
                  </div>

                  <form onSubmit={handleBooking} className="w-full space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="text-left">
                        <label className="mb-2 block text-sm font-bold">
                          Servicio *
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="bg-secondary/20 focus:border-primary w-full rounded-full border-2 border-transparent px-6 py-4 transition-all focus:outline-none"
                        >
                          <option value="">Selecciona un servicio</option>
                          {services.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-left">
                        <label className="mb-2 block text-sm font-bold">
                          Fecha *
                        </label>
                        <div className="relative">
                          <Calendar className="text-muted-foreground absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2" />
                          <input
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setSelectedTime('');
                              setError('');
                            }}
                            className="bg-secondary/20 focus:border-primary w-full rounded-full border-2 border-transparent py-4 pl-12 pr-6 transition-all focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="mb-3 block text-sm font-bold">
                        Horario disponible *
                      </label>

                      {!selectedDate ? (
                        <p className="text-muted-foreground text-sm">
                          Primero selecciona una fecha para ver los horarios.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                          {availableTimes.map((time) => {
                            const nowHourColombia = Number(
                              new Intl.DateTimeFormat('en-US', {
                                timeZone: 'America/Bogota',
                                hour: '2-digit',
                                hour12: false,
                              }).format(new Date()),
                            );

                            const reserved =
                              busyTimes.includes(time) ||
                              (selectedDate === today &&
                                parseInt(time.split(':')[0]) <= nowHourColombia);

                            return (
                              <button
                                type="button"
                                key={time}
                                disabled={reserved}
                                onClick={() => {
                                  if (!reserved) {
                                    setSelectedTime(time);
                                    setError('');
                                  }
                                }}
                                className={`rounded-full border-2 px-4 py-3 text-sm font-bold transition-all ${reserved
                                  ? 'cursor-not-allowed border-transparent opacity-30'
                                  : selectedTime === time
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border hover:border-primary'
                                  }`}
                              >
                                <Clock className="mr-1 inline h-4 w-4" />
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="text-left">
                        <label className="mb-2 block text-sm font-bold">
                          Nombre *
                        </label>
                        <div className="relative">
                          <User className="text-muted-foreground absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-secondary/20 focus:border-primary w-full rounded-full border-2 border-transparent py-4 pl-12 pr-6 transition-all focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="text-left">
                        <label className="mb-2 block text-sm font-bold">
                          WhatsApp *
                        </label>
                        <div className="relative">
                          <Phone className="text-muted-foreground absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2" />
                          <input
                            type="tel"
                            placeholder="Tu número"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-secondary/20 focus:border-primary w-full rounded-full border-2 border-transparent py-4 pl-12 pr-6 transition-all focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="mb-2 block text-sm font-bold">
                        Mensaje adicional
                      </label>
                      <textarea
                        placeholder="Cuéntame detalles del evento, estilo de maquillaje o alguna preferencia."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="bg-secondary/20 focus:border-primary w-full resize-none rounded-3xl border-2 border-transparent px-6 py-4 transition-all focus:outline-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm font-medium text-red-500">
                        {error}
                      </p>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-bold shadow-lg"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Solicitar cita por WhatsApp
                      </button>
                    </motion.div>
                  </form>

                  <p className="text-muted-foreground text-xs">
                    * La cita queda como solicitud y será confirmada por
                    WhatsApp según disponibilidad.
                  </p>
                </>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="bg-primary/20 flex h-24 w-24 items-center justify-center rounded-full">
                      <Heart className="text-primary h-12 w-12 fill-current" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-heading text-foreground text-3xl font-bold">
                      ¡Solicitud enviada!
                    </h2>

                    <p className="text-muted-foreground mx-auto max-w-md text-lg">
                      Gracias, {name}. Tu solicitud fue enviada por WhatsApp.
                      Pronto recibirás confirmación de disponibilidad.
                    </p>
                  </div>

                  <div className="bg-secondary/20 mx-auto max-w-md rounded-3xl p-6 text-left text-sm">
                    <p className="mb-3 font-bold">Resumen de la cita</p>
                    <p>Servicio: {service}</p>
                    <p>Fecha: {selectedDate}</p>
                    <p>Hora: {selectedTime}</p>
                    <p>WhatsApp: {phone}</p>
                  </div>

                  <a href="/" className="inline-block">
                    <button className="border-primary text-primary hover:bg-primary/10 rounded-full border-2 px-8 py-2 transition-colors">
                      Volver al inicio
                    </button>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;