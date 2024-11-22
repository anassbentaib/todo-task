import React from "react";
import Navbar from "../components/Navbar";

interface PagesLayoutProps {
  children: React.ReactNode;
}
const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PagesLayout;
