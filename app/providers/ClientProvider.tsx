'use client';
import { Provider } from 'react-redux';
import store from '@state/store';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen bg-second">
        <Header />
        <main className="flex-auto mt-16 p-4 overflow-y-auto">
          <div className="mx-auto max-w-[1200px]">{children}</div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
