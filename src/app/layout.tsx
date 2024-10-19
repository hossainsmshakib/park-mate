"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <div className="p-4">{children}</div>
        </main>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold">Add/Edit Vehicle</h2>
              <button onClick={toggleModal} className="mt-4 text-red-500">
                Close
              </button>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
