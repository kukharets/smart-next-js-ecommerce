'use client';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-second">
      <header className="text-text p-4 fixed top-0 w-full z-10 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm">
        Smart ecommerce example By Taras Kukharets
      </header>
      <main className="flex-auto mt-16 p-4 overflow-y-auto">{children}</main>
      <footer className="text-white p-4 fixed bottom-0 w-full bg-gradient-to-r from-main to-second via-minor z-20">
        <div className="flex justify-center gap-10">
          <p>Contact</p>
          <p>Source code</p>
        </div>
      </footer>
    </div>
  );
}
