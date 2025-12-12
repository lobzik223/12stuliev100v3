import SchedulePage from "@/components/SchedulePage";

// Отключаем статическую генерацию для этой страницы, чтобы избежать таймаутов
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Schedule() {
  return <SchedulePage />;
}

