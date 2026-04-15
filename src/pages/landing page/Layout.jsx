import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetCurrentUser } from "./useGetCurrentUser";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { currentUser } = useGetCurrentUser();
  console.log(currentUser);

  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

                    * {
                        font-family: 'Geist', sans-serif;
                    }
                    h1{
                        font-family: "Urbanist", sans-serif;
                    }
                `}
      </style>
      <section className="  flex flex-col items-center max-md:px-2 bg-[#E6EFFF] pt-5 bg-cover bg-center bg-no-repeat">
        <nav className="mt-[-15px] w-[80%] m-auto flex items-center  max-w-6xl justify-between text-slate-100">
          <div>
            <Link to={"/"}>
              <img
                className="w-[200px] m-[-20px]"
                src="/vendora-logo.png"
                alt=""
              />
            </Link>
          </div>

          <div
            id="menu"
            className={`${mobileOpen ? "max-md:left-0" : "max-md:-left-full"} max-md:fixed max-md:bg-black/70 max-md:backdrop-blur max-md:top-0 transition-all duration-300 max-md:h-screen max-md:w-full max-md:z-50 max-md:justify-center flex-col md:flex-row flex items-center gap-2 text-sm`}
          >
            <Link
              to={"/"}
              className="px-4 py-2  text-slate-700 hover:text-slate-500"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="px-4 py-2 text-slate-700 hover:text-slate-500"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              to={"/products"}
              className="px-4 py-2 text-slate-700 hover:text-slate-500"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>
            <Link
              to={"/testimonials"}
              className="px-4 py-2 text-slate-700 hover:text-slate-500"
              onClick={() => setMobileOpen(false)}
            >
              Testimonial
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-indigo-500"
          >
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {currentUser ? (
            currentUser?.role === "admin" ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to={"/dashboard"}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition cursor-pointer"
                >
                  Admin panel
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to={"/dashboard"}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition cursor-pointer"
                >
                My Dashboard
                </Link>
              </div>
            )
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <div className="hidden md:block p-px rounded-full bg-linear-to-b from-white to-white/60">
                <Link to={"/auth/register"}>
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition cursor-pointer">
                    Get started
                  </button>
                </Link>
              </div>
              <div className="hidden md:block p-px rounded-full bg-linear-to-b from-white to-white/60">
                <Link to={"/auth/login"}>
                  <button className="text-indigo-600 bg-indigo-100 hover:bg-indigo-200 text-sm px-6 py-2 rounded-full transition cursor-pointer font-medium">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </section>
      <Outlet />
      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#E6EFFF] to-[#F5F7FF] border-t border-indigo-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-24 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-indigo-100">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img className="w-40 m-[-25px] " src="/vendora-logo.png" alt="" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A modern market platform to generate sales, simplify shopping and
              improve purchase/sale experiences for modern teams.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              {[
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-2 .93-3.13 1.21A4.48 4.48 0 0 0 11.5 6.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
                <>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </>,
                <>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Reviews", "Updates"],
            },
            {
              title: "Company",
              links: ["About", "Vendors", "Press Kit", "Contact"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Guides", "Community", "Support"],
            },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-gray-900 font-semibold text-sm">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 text-sm hover:text-indigo-600 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 border-b border-indigo-100">
          <div>
            <p className="text-gray-900 font-semibold text-sm">
              Stay in the loop
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Get product updates and tips delivered to your inbox.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-full text-sm border border-indigo-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-full transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} vendora, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-indigo-600 transition"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Layout;
