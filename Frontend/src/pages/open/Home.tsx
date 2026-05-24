import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  BookMarked,
  Brain,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,
  HeartHandshake,
  Library,
  MapPin,
  MonitorSmartphone,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Laptop2,
} from "lucide-react";
import { Mail, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import building1 from "../../assets/building-1.jpg";
import building2 from "../../assets/building-3.jpg";

const heroSlides = [
  {
    image: building1,
    title: "Read deeper, think clearer, achieve higher..",
    subtitle:
      "Discover peaceful spaces, trusted resources, and support that helps students succeed.",
    badge: "Study smarter every day",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    title: "Your quiet corner for serious study",
    subtitle:
      "A vibrant college library where focus, curiosity, and ambition grow together.",
    badge: "Knowledge. Focus. Growth.",
  },
  {
    image: building2,
    title: "More time with books means stronger ideas.",
    subtitle:
      "A vibrant college library where focus, curiosity, and ambition grow together.",
    badge: "Knowledge. Focus. Growth.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
    title: "More time with books means stronger ideas.",
    subtitle:
      "From textbooks to literature and journals, every shelf opens a new academic path.",
    badge: "Build daily reading habits",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    title: "Your quiet corner for serious study.",
    subtitle:
      "Discover peaceful spaces, trusted resources, and support that helps students succeed.",
    badge: "Study smarter every day",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    title: "Your quiet corner for serious study.",
    subtitle:
      "Discover peaceful spaces, trusted resources, and support that helps students succeed.",
    badge: "Study smarter every day",
  },
];

const quickStats = [
  { label: "Books & Journals", value: "25k+", icon: BookOpen },
  { label: "Digital Resources", value: "8k+", icon: Laptop2 },
  { label: "Reading Seats", value: "320", icon: Users },
  { label: "Study Support Hours", value: "12/day", icon: Clock3 },
];

const importanceCards = [
  {
    title: "Better concentration",
    text: "Libraries provide quiet spaces that help students focus for longer periods and study with fewer distractions.",
    icon: Brain,
  },
  {
    title: "Trusted academic sources",
    text: "Students get access to curated books, journals, and reference materials that strengthen assignments and research.",
    icon: ShieldCheck,
  },
  {
    title: "Healthy reading habit",
    text: "Regular time with books improves comprehension, vocabulary, confidence, and independent learning.",
    icon: BookMarked,
  },
  {
    title: "Campus community",
    text: "The library becomes a welcoming third place where students learn, connect, and grow beyond the classroom.",
    icon: HeartHandshake,
  },
];

const reasonsToStay = [
  "A calm environment improves attention and retention.",
  "Reading physical books reduces endless screen fatigue.",
  "Librarians help students discover better research sources.",
  "Time in the library creates stronger study discipline.",
  "A book-rich environment naturally motivates deeper learning.",
  "Students can turn free time into meaningful reading time.",
];

const featureBlocks = [
  {
    title: "Catalog & Discovery",
    text: "Quickly search books, journals, theses, archived papers, and digital collections from one place.",
    icon: Search,
  },
  {
    title: "Digital Learning Access",
    text: "Use e-books, online journals, institutional repositories, and remote study resources on any device.",
    icon: MonitorSmartphone,
  },
  {
    title: "Quiet Zones & Study Rooms",
    text: "Choose silent reading corners, collaborative spaces, and focused study rooms for every learning style.",
    icon: Library,
  },
  {
    title: "Academic Support",
    text: "Get help with citations, project references, subject guides, and academic reading recommendations.",
    icon: GraduationCap,
  },
];

const testimonials = [
  {
    name: "Koushik Shil",
    role: "CST Dept.",
    text: "The library became my best study place during exams. The silence, books, and atmosphere helped me stay consistent.",
  },
  {
    name: "Ritu Das",
    role: "CST Dept.",
    text: "I spend more time in the library now because it keeps me away from distractions and gives me better research sources.",
  },
  {
    name: "Purba Roy",
    role: "CST Dept.",
    text: "The best thing is that the library makes reading feel natural. Once I sit there, I automatically want to study.",
  },
];

const updates = [
  "New arrivals in Computer Science, Civil, Electrical, Mechanical",
  "Exam special reading room timings extended till 6 PM",
  "Available all previous years question papers",
];

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "zoom";
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenClass = {
    up: "translate-y-12 opacity-0",
    left: "-translate-x-12 opacity-0",
    right: "translate-x-12 opacity-0",
    zoom: "scale-95 opacity-0",
  }[direction];

  const visibleClass = "translate-y-0 translate-x-0 scale-100 opacity-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${
        visible ? visibleClass : hiddenClass
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.title}
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.35),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.35),transparent_28%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.35)] backdrop-blur">
                <BookMarked className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Library
                </p>
                <h1 className="text-lg font-bold sm:text-xl">
                  LCG Institute Of Polytecnic
                </h1>
              </div>
            </div>

            <Link
              to="/login"
              className="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/55 px-4 py-2 text-base font-semibold text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.25)] transition hover:bg-fuchsia-500/20"
            >
              Login Here
            </Link>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur shadow-[0_0_30px_rgba(34,211,238,0.14)]">
                <Sparkles className="h-4 w-4" />
                {heroSlides[currentSlide].badge}
              </div>

              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {heroSlides[currentSlide].title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300">
                  Became A Part Our Dictonary
                </button>
                <button className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                  Explore Reading Spaces
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Open today till 4 PM
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-white/5 px-4 py-2">
                  <MapPin className="h-4 w-4 text-fuchsia-300" />
                  Lambodarpur, Suri
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.16)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Quick Search</p>
                    <h3 className="mt-1 text-xl font-bold">
                      Discover your next book
                    </h3>
                  </div>
                  <Search className="h-5 w-5 text-cyan-300" />
                </div>

                <div className="mt-5 rounded-2xl bg-white p-2 shadow-lg">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-slate-500">
                    <Search className="h-4 w-4" />
                    <input
                      type="text"
                      className="w-full outline-none"
                      placeholder="Search books, authors, journals..."
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-2">
                    {quickStats.map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-2xl bg-slate-100 p-3">
                        <Icon className="h-4 w-4 text-cyan-700" />
                        <p className="mt-2 text-lg font-extrabold text-slate-900">
                          {value}
                        </p>
                        <p className="text-xs text-slate-600">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4 backdrop-blur shadow-[0_0_25px_rgba(34,211,238,0.16)]">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === index
                          ? "w-10 bg-cyan-300"
                          : "w-2.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {importanceCards.map(({ title, text, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 120} direction="up">
              <div className="rounded-3xl border border-cyan-400/15 bg-slate-900/80 p-6 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_0_24px_rgba(34,211,238,0.14)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.16)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal direction="left">
            <div className="rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 p-6 shadow-[0_0_35px_rgba(217,70,239,0.12)] sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
                <Flame className="h-4 w-4" />
                Spend more time with books
              </div>
              <h3 className="mt-5 text-3xl font-black sm:text-4xl">
                The library builds a reading habit that the classroom alone
                cannot.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Time spent around books naturally encourages curiosity,
                self-discipline, and deep learning. A student who visits the
                library regularly often reads more, thinks more independently,
                and performs better academically.
              </p>

              <div className="mt-6 space-y-3">
                {reasonsToStay.map((item, index) => (
                  <Reveal key={item} delay={index * 100} direction="up">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-fuchsia-400/20 hover:bg-white/10">
                      <Star className="mt-0.5 h-4 w-4 text-cyan-300" />
                      <p className="text-sm text-slate-200">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-900/80 p-6 shadow-[0_0_35px_rgba(34,211,238,0.12)] sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <CalendarDays className="h-4 w-4" />
                Library highlights
              </div>

              <div className="mt-6 space-y-4">
                {updates.map((item, index) => (
                  <Reveal key={item} delay={index * 120} direction="up">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/20 hover:bg-white/10">
                      <p className="font-medium text-slate-100">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={260} direction="zoom" className="mt-8">
                <div className="rounded-3xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 p-[1px]">
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      Reading challenge
                    </p>
                    <h4 className="mt-2 text-2xl font-extrabold">
                      30 minutes a day in the library
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      A small daily reading routine can improve focus, reduce
                      procrastination, and make studying less stressful.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal direction="up">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Explore the library
            </p>
            <h3 className="mt-3 text-3xl font-black sm:text-4xl">
              More than shelves — a complete student success zone
            </h3>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featureBlocks.map(({ title, text, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 120} direction="zoom">
              <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-fuchsia-300 shadow-[0_0_18px_rgba(217,70,239,0.12)] transition duration-500 hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 text-xl font-bold">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
        <Reveal direction="up">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-10">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                Student voices
              </p>
              <h3 className="mt-3 text-3xl font-black sm:text-4xl">
                Why students choose the library
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={index * 140} direction="up">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_24px_rgba(168,85,247,0.08)] transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/10">
                    <Quote className="h-8 w-8 text-cyan-300" />
                    <p className="mt-4 text-sm leading-7 text-slate-200">
                      {item.text}
                    </p>
                    <div className="mt-6">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative mt-10 border-t border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_24%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.18)]">
                    <BookMarked className="h-6 w-6 text-cyan-300" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      LCG Institute Of Polytecnic
                    </h3>
                    <p className="text-sm text-slate-400">
                      College Library Portal
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                  A modern college library platform designed to encourage
                  focused study, reading habits, academic discovery, and
                  meaningful time with books.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="flex items-start gap-3 text-sm text-slate-400">
                    <MapPin className="mt-1 h-4 w-4 text-cyan-300" />
                    <span>
                      Lambodarpur- Suri,
                      <br />
                      West Bengal, India
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Phone className="h-4 w-4 text-cyan-300" />
                    <span>+91 98307 21351</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Mail className="h-4 w-4 text-cyan-300" />
                    <span>lcgms16@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Clock3 className="h-4 w-4 text-cyan-300" />
                    <span>Mon - Sat, 10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={80}>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Library Services
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                  <li className="transition hover:text-cyan-300">
                    Book Search
                  </li>
                  <li className="transition hover:text-cyan-300">
                    Digital Library
                  </li>
                  <li className="transition hover:text-cyan-300">
                    Issue & Return
                  </li>
                  <li className="transition hover:text-cyan-300">
                    Reading Rooms
                  </li>
                  <li className="transition hover:text-cyan-300">
                    Reference Help
                  </li>
                  <li className="transition hover:text-cyan-300">
                    Research Support
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal direction="up" delay={160}>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Quick Links
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                  <div>
                    <Link
                      to={"http://lcginstitute.com/"}
                      target="_blank"
                      className="transition hover:text-fuchsia-300"
                    >
                      Official Website
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"http://lcginstitute.com/about.php"}
                      target="_blank"
                      className="transition hover:text-fuchsia-300"
                    >
                      About Us
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"http://lcginstitute.com/admission.php"}
                      target="_blank"
                      className="transition hover:text-fuchsia-300"
                    >
                      Admission
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"http://lcginstitute.com/gallery.php"}
                      target="_blank"
                      className="transition hover:text-fuchsia-300"
                    >
                      Gallery
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"http://lcginstitute.com/contact.php"}
                      target="_blank"
                      className="transition hover:text-fuchsia-300"
                    >
                      Career
                    </Link>
                  </div>
                </ul>
              </div>
            </Reveal>

            <Reveal direction="right" delay={240}>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Stay Connected
                </h4>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Follow the library for updates, announcements, reading
                  inspiration, and academic events across campus.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={"https://www.facebook.com/LCGIP/"}
                    type="button"
                    target="_blank"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                  >
                    <SiFacebook className="h-5 w-5" />
                  </Link>

                  <button
                    type="button"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-fuchsia-400/40 hover:text-fuchsia-300 hover:shadow-[0_0_18px_rgba(217,70,239,0.2)]"
                  >
                    <SiInstagram className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    aria-label="YouTube"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-red-400/40 hover:text-red-300 hover:shadow-[0_0_18px_rgba(248,113,113,0.2)]"
                  >
                    <SiYoutube className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <p className="text-sm font-semibold text-white">
                    Reading builds stronger futures
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Visit the library regularly to explore books, improve focus,
                    and grow beyond classroom learning.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal
            direction="up"
            delay={180}
            className="mt-10 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[1fr_auto] md:items-center"
          >
            <>
              <p className="text-sm text-slate-500">
                © 2026 Subhadeep & Team. All rights reserved.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <button
                  type="button"
                  className="transition hover:text-cyan-300"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  className="transition hover:text-cyan-300"
                >
                  Terms & Conditions
                </button>
                <button
                  type="button"
                  className="transition hover:text-cyan-300"
                >
                  Accessibility
                </button>
                <button
                  type="button"
                  className="transition hover:text-cyan-300"
                >
                  Sitemap
                </button>
              </div>
            </>
          </Reveal>
        </div>
      </footer>
    </div>
  );
};
