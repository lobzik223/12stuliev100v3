import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Страница не найдена</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-[#FBC632] text-[#682302] rounded-lg hover:opacity-80 transition-opacity"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

