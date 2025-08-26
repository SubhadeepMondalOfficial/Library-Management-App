import { BookOpen } from "lucide-react";
import type React from "react";
import { Outlet } from "react-router-dom";

export const OpenLayout: React.FC = () => {
  return (
    <div>
      <header className="flex justify-between px-6 py-3 shadow-lg relative h-[66px] z-50">
        <aside className="flex gap-2 justify-center items-center">
            <BookOpen className="h-8 w-8 text-brand-primary-900" />
            <span className="text-xl font-bold text-brand-primary-900">LCG Library</span>
        </aside>
        <aside>
          <nav className="flex justify-center items-center gap-7">
            <button className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-brand-primary-900 hover:duration-500 transition-all ease-in-out py-2 px-4 rounded">
              Home
            </button>
            <button className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-brand-primary-900 hover:duration-500 transition-all ease-in-out py-2 px-4 rounded">
              Books
            </button>
            <button className="bg-brand-primary-900 text-text-dark py-2 px-6 rounded ml-2 hover:bg-brand-primary-700 duration-300">
              Login
            </button>
          </nav>
        </aside>
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
};
