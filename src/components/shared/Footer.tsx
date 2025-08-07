import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center dark:bg-gray-800 mt-auto">
      <p className="text-sm">&copy; {new Date().getFullYear()} - All Rights Reserved</p>
    </footer>
  );
}