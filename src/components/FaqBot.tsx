import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto dura una cita?',
    answer:
      'La duración de la sesión depende del tipo de maquillaje que elijas. Cada servicio está pensado para garantizar un resultado detallado y de alta calidad, por lo que el tiempo puede variar según tus necesidades.',
  },
  {
    question: '¿Haces maquillaje a domicilio?',
    answer:
      'Sí, ofrecemos servicio a domicilio. Para este tipo de servicio debes comunicarte previamente por WhatsApp para validar disponibilidad y definir el costo adicional del desplazamiento.',
  },
  {
    question: '¿Cuánto cuesta el servicio?',
    answer:
      'El valor depende del tipo de maquillaje y de si requiere desplazamiento. Una vez solicites tu cita, te brindaremos toda la información y confirmación del valor por WhatsApp.',
  },
  {
    question: '¿Qué incluye el servicio?',
    answer:
      'El servicio incluye preparación de la piel para optimizar el acabado, maquillaje profesional personalizado según tu tipo de piel y estilo, aplicación de pestañas tipo cortina y sellado del maquillaje para garantizar una mayor duración y un resultado impecable.',
  },
  {
    question: '¿Cómo puedo reservar?',
    answer:
      'Puedes agendar directamente desde la página seleccionando el servicio, la fecha y el horario disponible. Luego serás redirigida a WhatsApp para confirmar tu cita.',
  },
  {
    question: '¿Qué debo tener en cuenta antes de la cita?',
    answer:
      'Te recomendamos asistir con el rostro limpio y sin maquillaje.',
  },
  {
    question: '¿Qué métodos de pago aceptas?',
    answer:
      'Los métodos de pago se coordinan directamente por WhatsApp al momento de confirmar tu cita.',
  },
  {
    question: '¿Con cuánto tiempo debo reservar?',
    answer:
      'Se recomienda reservar con anticipación, especialmente para fines de semana, novias o eventos especiales, ya que la disponibilidad puede ser limitada.',
  },
];

const FaqBot = () => {
  const [open, setOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<(typeof faqs)[0] | null>(null);

  const WHATSAPP_NUMBER = '573015955097';
  const whatsappMessage =
    'Hola, quiero recibir más información sobre los servicios de maquillaje.';

  const closeBot = () => {
    setOpen(false);
    setSelectedFaq(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 flex h-[78vh] w-[calc(100vw-2.5rem)] max-w-[390px] flex-col overflow-hidden rounded-[1.8rem] border border-border/50 bg-card shadow-2xl sm:h-[610px]"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-5 text-primary-foreground">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-button-text">
                    <Sparkles className="h-5 w-5 text-button-text" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide opacity-80 text-button-text">
                      Asistente virtual
                    </p>
                    <h3 className="text-xl font-bold leading-tight text-button-text">
                      Makeup Assistant
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeBot}
                  className="rounded-full bg-white/20 p-2 transition hover:bg-white/30 text-button-text"
                  aria-label="Cerrar chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed opacity-90 text-button-text">
                Estoy aquí para resolver tus dudas antes de reservar tu cita.
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-background/40 p-4">
              {!selectedFaq ? (
                <div className="space-y-4">
                  <div className="max-w-[85%] rounded-3xl rounded-tl-sm bg-secondary/40 px-4 py-3 text-left">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Hola, elige una pregunta frecuente y te responderé al
                      instante.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <motion.button
                        key={faq.question}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => setSelectedFaq(faq)}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-card px-4 py-3 text-left text-sm font-medium shadow-sm transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        <HelpCircle className="h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-snug">{faq.question}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  key={selectedFaq.question}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(null)}
                    className="flex items-center gap-1 text-sm font-bold text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Volver a preguntas
                  </button>

                  <div className="ml-auto max-w-[88%] rounded-3xl rounded-tr-sm bg-primary px-4 py-3 text-left text-sm font-semibold text-primary-foreground">
                    {selectedFaq.question}
                  </div>

                  <div className="max-w-[90%] rounded-3xl rounded-tl-sm bg-secondary/40 px-4 py-4 text-left">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedFaq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/40 bg-card p-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  whatsappMessage,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-button-text shadow-lg transition hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                  Hablar por WhatsApp
                </button>
              </a>

              <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
                Respuesta rápida para reservas, precios y disponibilidad.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-2xl text-button-text"
        aria-label="Abrir chat de preguntas frecuentes"
      >
        {open ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </motion.button>

      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-20 right-0 hidden items-center gap-2 whitespace-nowrap rounded-full bg-card px-4 py-2 text-sm font-medium shadow-lg sm:flex"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          ¿Necesitas ayuda?
        </motion.div>
      )}
    </div>
  );
};

export default FaqBot;