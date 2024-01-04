import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => (
  <nav className="container mx-auto h-16  flex items-center">
    <Link href="/">jpegs</Link>
  </nav>
);

export default Navbar;
