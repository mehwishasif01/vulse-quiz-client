import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ClientProviders } from "../libs/providers/clientProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <Component {...pageProps} />
    </ClientProviders>
  );
}
