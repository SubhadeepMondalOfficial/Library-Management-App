// import { BookOpen } from "lucide-react";
import type React from "react";
import { Outlet } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export const OpenLayout: React.FC = () => {
  const [topText] = useTypewriter({
    words: ["Welcome To The Ultimate Library Management System"],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 0,
    delaySpeed: 4000,
  });
  return (
    <div>
      {/* <header className="flex justify-between px-6 py-3 shadow-lg relative h-[66px] z-50">
        <aside className="flex gap-2 justify-center items-center">
            <BookOpen className="h-8 w-8 text-brand-primary-900" />
            <span className="text-xl font-bold text-brand-primary-900">LCG Library</span>
        </aside>
        <aside>
          <nav className="flex justify-center items-center gap-7">
            <Link to='/' className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-brand-primary-900 hover:duration-500 transition-all ease-in-out py-2 px-4 rounded">
              Home
            </Link>
            <Link to="/books" className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-brand-primary-900 hover:duration-500 transition-all ease-in-out py-2 px-4 rounded">
              Books
            </Link>
            <Link to="/login" className="bg-brand-primary-900 text-text-dark py-2 px-6 rounded ml-2 hover:bg-brand-primary-700 duration-300">
              Login
            </Link>
          </nav>
        </aside>
      </header> */}

      <div className="relative overflow-hidden border-b border-cyan-400/20 bg-slate-950 z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.10),transparent_20%),radial-gradient(circle_at_right,rgba(217,70,239,0.10),transparent_20%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:text-base"
              aria-label="Welcome To The Ultimate Library Management System"
            >
              <span aria-hidden="true">{topText}</span>
              <Cursor cursorColor="#22d3ee" />
            </p>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
