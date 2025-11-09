import logoImage from "@/app/assets/images/logosaas.png";
import Image from "next/image";
import { MenuIcon } from "./icons/MenuIcon";

export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className=" px-4">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            {/* <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md "></div> */}
            <Image
              src={logoImage}
              alt="Sass Logo"
              className="w-12 h-12 relative"
            />
          </div>
          <div className="border border-white/30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
            <MenuIcon className="text-white" />
          </div>
          <nav className="text-white items-center sm:flex gap-6 hidden">
            <a
              href="#"
              className="text-white opacity-60 hover:opacity-100 transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-white opacity-60 hover:opacity-100 transition-transform"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white opacity-60 hover:opacity-100 transition-transform"
            >
              Updates
            </a>
            <a
              href="#"
              className="text-white opacity-60 hover:opacity-100 transition-transform"
            >
              Help
            </a>
            <a
              href="#"
              className="text-white opacity-60 hover:opacity-100 transition-transform"
            >
              Customers
            </a>
            <button className="text-black bg-white py-2 px-4 rounded-lg">
              Get for Free
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
