import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="px-4">{children}</div>
    </div>
  );
};

export default Layout;

const Navbar = () => {
  return (
    <nav className="w-full border-2 border-blue-900 p-4">
      <ul className="flex gap-4">
        <li>
          <Link href="/films">Films</Link>
        </li>
        <li>
          <Link href="/planets">Planets</Link>
        </li>
        {/* <li>Planets</li>
        <li>Starships</li>
        <li>Vehicles</li>
        <li>People</li>
        <li>Species</li> */}
      </ul>
    </nav>
  );
};
