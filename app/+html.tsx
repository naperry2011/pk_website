import { ScrollViewStyleReset } from 'expo-router/html';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* SEO Meta Tags */}
        <title>Akuapem Paramount King Council - Official Website</title>
        <meta name="description" content="Official website of the Akuapem Paramount King Council. Explore the history, leadership, towns, and community updates of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta name="keywords" content="Akuapem, Paramount King, Traditional Council, Okuapehene, Ghana, Eastern Region, Akropong, Akuapem Ridge, traditional authority" />
        <meta name="author" content="Akuapem Paramount King Council" />

        {/* Theme Color */}
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#D4AF37" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Akuapem Paramount King Council - Official Website" />
        <meta property="og:description" content="Official website of the Akuapem Paramount King Council. Explore the history, leadership, towns, and community updates of the Akuapem Traditional Area." />
        <meta property="og:site_name" content="Akuapem Paramount King Council" />
        <meta property="og:locale" content="en_GH" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Akuapem Paramount King Council - Official Website" />
        <meta name="twitter:description" content="Official website of the Akuapem Paramount King Council. Explore the history, leadership, towns, and community updates of the Akuapem Traditional Area." />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Fonts Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Disable body scrolling on web for native-like ScrollView behavior */}
        <ScrollViewStyleReset />

        {/* Base body styles */}
        <style dangerouslySetInnerHTML={{ __html: bodyStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const bodyStyles = `
body {
  background-color: #F5F5F0;
}`;
