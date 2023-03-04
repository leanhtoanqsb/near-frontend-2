import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { GlobalStyle } from "@/components/GlobalStyle";
import Navbar from "@/components/Navbar";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        {/* <Hydrate state={pageProps.dehydrate}> */}
        <Navbar />
        <Component {...pageProps} />
        {/* </Hydrate> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
