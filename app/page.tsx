import MainScreen from "@/components/MainScreen";
import { headers } from "next/headers";

export default function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const debug = searchParams?.debug === '1';
  const ua = headers().get('user-agent') ?? '';
  const ssrIsIOS = /iPhone|iPad|iPod/i.test(ua);

  return <MainScreen initialDebug={debug} ssrIsIOS={ssrIsIOS} />;
}

