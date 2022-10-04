import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon96x96.png" />
          <link rel="icon" type="image/png" sizes="196x196" href="/favicon196x196.png" />
          <title>SwaliSoft | Home</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
