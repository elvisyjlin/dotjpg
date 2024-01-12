import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => (
  <nav className="container mx-auto h-16  flex items-center">
    <Link className="hover:bg-slate-50 px-4 py-2 rounded-lg" href="/">.jpg</Link>
  </nav>
);

export default Navbar;
