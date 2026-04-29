import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  MessageCircle,
  Menu,
  X,
  PawPrint,
  Flower,
  Users,
  BookOpen,
  Compass,
  Star,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import FaqBot from '../components/FaqBot';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'community', 'aboutme ', 'cta'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Servicios', id: 'services' },
    { href: '#community', label: 'Testimonios', id: 'community' },
    { href: '#aboutme ', label: 'Sobre mí', id: 'aboutme ' },
  ];

  return (
    <nav className="bg-background/80 border-border/40 relative sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-6 shadow-sm backdrop-blur-lg md:px-12">
      <a
        href="/"
        className="text-primary flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <Flower className="h-8 w-8" />
        <span className="font-heading text-foreground text-2xl font-bold">
          Maria Torres MakeUp
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-testid={`link-${link.id}`}
            className={`relative w-fit transition-colors ${activeSection === link.id
              ? 'text-primary font-bold'
              : 'text-muted-foreground hover:text-primary'
              }`}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.div>
          </a>
        ))}
        <a href="/join">
          <button
            data-testid="button-join-nav"
            className="font-heading bg-primary text-button-text hover:bg-primary/90 rounded-full px-6 py-2 font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Reserva tu cita
          </button>
        </a>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="text-foreground bg-primary/10 hover:bg-primary/25 rounded-full p-2 transition-colors md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-menu-toggle"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Nav Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card border-border/60 absolute top-full right-4 left-4 z-50 mt-2 flex w-[calc(100%-2rem)] flex-col gap-6 rounded-2xl border p-8 shadow-2xl md:hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                data-testid={`link-${link.id}-mobile`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                whileHover={{ x: 4 }}
                className={`w-fit text-center text-lg font-medium transition-colors duration-300 ${activeSection === link.id
                  ? 'text-primary font-bold'
                  : 'text-foreground hover:text-primary'
                  }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="border-border/40 border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: navLinks.length * 0.08 + 0.1,
                duration: 0.25,
              }}
            >
              <a
                href="/join"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    data-testid="button-join-mobile"
                    className="font-heading bg-primary text-button-text hover:bg-primary/90 w-full rounded-full py-4 font-medium shadow-lg transition-all hover:shadow-xl"
                  >
                    Reserva tu cita
                  </button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center overflow-hidden px-6 py-12 md:flex-row md:px-12 lg:px-24"
    >
      {/* Decorative Blobs */}
      <div className="bg-primary/10 absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-accent/30 absolute right-[-5%] bottom-[10%] -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="relative z-10 w-full space-y-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-hand text-primary mb-4 inline-block -rotate-2 text-2xl">
            Sutil. Elegante. Tu!
          </span>
          <h1 className="font-heading text-foreground mb-6 text-5xl leading-[1.1] font-bold md:text-7xl">
            Resalta tu{' '}
            <span className="text-primary relative inline-block">
              Belleza
              <svg
                className="text-accent absolute -bottom-1 left-0 -z-10 h-3 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{' '}
            <br />
            con un toque natural !
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed md:text-xl">
            Maquillaje profesional para eventos, novias y sesiones especiales,
            diseñado para que te sientas auténtica, segura y radiante.
          </p>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Star, label: 'Atención personalizada', color: 'text-yellow-600' },
              { icon: Lock, label: '100% Belleza natural', color: 'text-green-600' },
              { icon: Heart, label: 'Clientas felices', color: 'text-red-600' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-secondary/30 border-border/40 flex items-center justify-center gap-2 rounded-full border px-3 py-2"
              >
                <badge.icon
                  className={`h-4 w-4 flex-shrink-0 ${badge.color}`}
                />
                <span className="text-foreground text-xs font-semibold">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full md:mt-0 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <img
            src="/images/fondomtmakeup.png"
            alt="Sleeping zen cat on a cloud"
            className="h-auto w-full transform rounded-[3rem] shadow-2xl transition-transform duration-700 hover:rotate-0 md:rotate-3"
          />

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="bg-card absolute -bottom-8 -left-4 flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:left-10 hidden sm:flex"
          >
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">100% Listas para brillar!</p>
              <p className="text-muted-foreground text-xs">Resultado natural y elegante</p>
            </div>
          </motion.div>

          {/* Second Badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="bg-card absolute -top-4 -right-4 flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:-right-8 hidden sm:flex"
          >
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">50+ clientas</p>
              <p className="text-muted-foreground text-xs">Experiencias reales</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  badge,
  desc,
  price,
  img,
  delay,
  testId,
}: {
  title: string;
  badge: string;
  desc: string;
  price: string;
  img: string;
  delay: number;
  testId: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    data-testid={testId}
  >
    <div className="bg-card h-full overflow-hidden rounded-[2rem] border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="flex h-full flex-col p-0">
        <div className="bg-secondary/30 h-56 overflow-hidden">
          <motion.img
            src={img}
            alt={title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="flex flex-1 flex-col items-center p-8 text-center">
          <span className="bg-primary/10 text-primary mb-4 rounded-full px-4 py-1 text-xs font-bold">
            {badge}
          </span>

          <h3 className="font-heading text-foreground mb-3 text-2xl font-bold">
            {title}
          </h3>

          <p className="text-muted-foreground mb-5 leading-relaxed">{desc}</p>

          <p className="text-primary mt-auto text-xl font-bold">{price}</p>

          <a href="/join" className="mt-6">
            <button className="bg-primary text-button-text hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-bold shadow-md transition">
              Reservar este servicio
            </button>
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Aboutme = () => {
  return (
    <section id="aboutme" className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] bg-primary/20" />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-card shadow-2xl">
            <img
              src="/images/fondomtmakeup2.png"
              alt="Maria Torres MakeUp"
              className="h-[520px] w-full object-cover object-center"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/85 p-5 shadow-lg backdrop-blur-md">
              <p className="font-heading text-foreground text-xl font-bold">
                Maria Torres
              </p>
              <p className="text-muted-foreground text-sm">
                Makeup Artist · Belleza natural y elegante
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="font-hand text-primary text-2xl">
              Sobre mí
            </span>

            <h2 className="font-heading text-foreground max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Maquillaje pensado para resaltar tu esencia, no para ocultarla.
            </h2>

            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Soy Maria Torres, makeup artist. Mi trabajo se enfoca en crear looks
              elegantes, naturales y personalizados para que te sientas segura,
              auténtica y radiante en cada momento especial.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-card p-5 shadow-md">
              <p className="font-heading text-foreground mb-2 text-lg font-bold">
                ✨ Atención personalizada
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada look se adapta a tu tipo de piel, estilo, evento y preferencias.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-card p-5 shadow-md">
              <p className="font-heading text-foreground mb-2 text-lg font-bold">
                💄 Acabado profesional
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Preparación de piel, aplicación cuidadosa y fijación para mayor duración.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-card p-5 shadow-md">
              <p className="font-heading text-foreground mb-2 text-lg font-bold">
                🤍 Belleza natural
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Looks sutiles, frescos y elegantes que mantienen tu esencia.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-card p-5 shadow-md">
              <p className="font-heading text-foreground mb-2 text-lg font-bold">
                📲 Reserva fácil
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Agenda desde la web y confirma los detalles directamente por WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="/join">
              <button className="bg-primary text-button-text hover:bg-primary/90 rounded-full px-8 py-3 font-bold shadow-lg transition">
                Reserva tu cita
              </button>
            </a>

            <a href="#services">
              <button className="border-primary text-primary hover:bg-primary/10 rounded-full border-2 px-8 py-3 font-bold transition">
                Ver servicios
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-white/50 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <span className="font-hand text-primary text-xl">
            Servicios de maquillaje
          </span>

          <h2 className="font-heading text-foreground mx-auto max-w-4xl text-4xl font-bold md:text-5xl">
            Realza tu belleza con un maquillaje profesional diseñado para cada ocasión.
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Cada servicio incluye técnica profesional, preparación de piel y un
            acabado pensado para resaltar tu estilo de forma natural y elegante.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FeatureCard
            title="Maquillaje social"
            badge="Más solicitado"
            desc="Ideal para eventos y ocasiones especiales. Incluye preparación de la piel, maquillaje personalizado, pestañas tipo cortina y fijación para mayor duración."
            price="Desde $130.000"
            img="/images/maquillajesocial.png"
            delay={0.1}
            testId="card-service-social"
          />

          <FeatureCard
            title="Maquillaje para novias"
            badge="Servicio premium"
            desc="Servicio completo para tu día especial, con maquillaje de alta duración, preparación de piel y asesoría personalizada para un resultado impecable."
            price="Desde $550.000"
            img="/images/maquillajenovia.png"
            delay={0.2}
            testId="card-service-bride"
          />

          <FeatureCard
            title="Maquillaje quinceañera"
            badge="Evento especial"
            desc="Look fresco y elegante adaptado a tu estilo. Incluye preparación de piel, maquillaje acorde al evento, pestañas y fijación profesional."
            price="Desde $450.000"
            img="/images/maquillajequince.png"
            delay={0.3}
            testId="card-service-quince"
          />

          <FeatureCard
            title="Peinado: Ondas"
            badge="Complemento ideal"
            desc="Ondas suaves y definidas para complementar tu maquillaje con un acabado armonioso, natural o glam."
            price="Desde $60.000"
            img="/images/peinadoondas.png"
            delay={0.4}
            testId="card-service-hair"
          />
        </div>

        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm">
          * Servicio a domicilio disponible con costo adicional. El valor del
          desplazamiento se define previamente por WhatsApp antes de prestar el
          servicio.
        </p>
      </div>
    </section>
  );
};

const Community = () => {
  const testimonials = [
    {
      name: 'Laura Martínez',
      role: 'Maquillaje social',
      quote:
        'Me encantó el resultado. Fue un maquillaje muy natural, elegante y duró perfecto durante todo el evento.',
      image: '/images/lauram.png',
    },
    {
      name: 'Daniela Pérez',
      role: 'Novia',
      quote:
        'Me sentí hermosa y segura en mi día especial. El maquillaje quedó impecable y tal como lo imaginaba.',
      image: '/images/danielap.png',
    },
    {
      name: 'Camila Torres',
      role: 'Quinceañera',
      quote:
        'El look fue delicado, fresco y muy acorde a mi estilo. Me sentí muy cómoda y feliz con el resultado.',
      image: '/images/camilat.png',
    },
    {
      name: 'Valentina Gómez',
      role: 'Maquillaje social',
      quote:
        'La atención fue excelente. Me sentí escuchada y el maquillaje quedó justo como lo quería.',
      image: '/images/sofiah.png',
    },
    {
      name: 'Sofía Herrera',
      role: 'Ondas y maquillaje',
      quote:
        'El maquillaje y las ondas se mantuvieron hermosos durante todo el evento. Amé el resultado.',
      image: '/images/valentinag.png',
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="community" className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <span className="font-hand text-primary text-xl">
            Experiencias reales
          </span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            Lo que dicen mis clientas
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-max gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {duplicatedTestimonials.map((person, idx) => (
              <div key={idx} className="w-[320px] shrink-0 md:w-[380px]">
                <div className="bg-card h-full rounded-[2rem] border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <div className="flex h-full flex-col p-8">
                    <div className="mb-6 flex items-center gap-4">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-heading text-foreground font-bold">
                          {person.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {person.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground flex-1 leading-relaxed italic">
                      "{person.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  return (
    <section
      className="bg-secondary/20 flex items-center justify-center px-6 py-24 text-center"
    >
      <motion.div
        className="relative max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3
          data-testid="text-quote"
          className="font-hand text-foreground/80 text-3xl leading-relaxed md:text-5xl"
        >
          No se trata de transformar,
          sino de realzar con delicadeza,
          respetar tu esencia
          y crear un look que hable por ti
          en cada momento especial.
        </h3>

        <div className="font-heading text-primary mt-8 font-bold">
          — Maria Torres
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="from-secondary/5 via-background to-primary/5 border-border/40 relative border-t bg-gradient-to-br px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-3"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-primary h-7 w-7" />
              <h3 className="font-heading text-foreground text-lg font-bold">
                Maria Torres MakeUp
              </h3>
            </div>

            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Maquillaje profesional para resaltar tu belleza natural con looks
              elegantes, personalizados y pensados para cada ocasión especial.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <div className="text-primary flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="font-heading text-sm font-bold">
                  Explora
                </span>
              </div>

              <div className="flex flex-col gap-2 pl-7">
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Servicios
                </a>

                <a
                  href="#community"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Testimonios
                </a>

                <a
                  href="#aboutme"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Sobre mí
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-primary flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-heading text-sm font-bold">
                  Contacto
                </span>
              </div>

              <div className="flex flex-col gap-2 pl-7">
                <a
                  href="https://wa.me/573015955097"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  WhatsApp
                </a>

                <a
                  href="/join"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Agendar cita
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h4 className="font-heading text-foreground font-bold">
                ¿Lista para tu próximo look?
              </h4>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Agenda tu sesión de maquillaje y confirma todos los detalles
                directamente por WhatsApp.
              </p>
            </div>

            <a href="/join" className="w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-button-text hover:bg-primary/90 w-full rounded-full px-6 py-3 font-bold shadow-lg transition-all hover:shadow-xl"
              >
                Reserva tu cita
              </motion.button>
            </a>
          </motion.div>
        </div>

        <div className="border-border/40 my-8 border-t" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground/60 flex flex-col items-center justify-between gap-4 text-center text-xs md:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} Maria Torres MakeUp. Todos los
            derechos reservados.
          </p>

          <p className="flex items-center justify-center gap-1">
            Hecho con <Heart className="text-primary h-3 w-3 fill-current" />{' '}
            para resaltar tu belleza
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-background selection:bg-primary/20 selection:text-primary-foreground min-h-screen">
      <Navigation />
      <Hero />
      <FaqBot />
      <Services />
      <Community />
      <Aboutme />
      <QuoteSection />
      <Footer />
    </div>
  );
}
