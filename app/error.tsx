'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">500</h1>
        <p className="text-xl mb-8">Произошла ошибка</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#FBC632] text-[#682302] rounded-lg hover:opacity-80 transition-opacity"
          >
            Попробовать снова
          </button>
          <Link 
            href="/" 
            className="px-6 py-3 bg-transparent border-2 border-[#FBC632] text-[#FBC632] rounded-lg hover:opacity-80 transition-opacity"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

