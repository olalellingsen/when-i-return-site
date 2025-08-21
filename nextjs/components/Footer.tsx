import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4">
      <p>© {new Date().getFullYear()} When I Return</p>
    </footer>
  );
}
