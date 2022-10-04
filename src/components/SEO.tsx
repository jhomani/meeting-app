import React from 'react';
import Head from 'next/head';

const SEO = ({
  title = 'Blockain Consulting',
  image = '/images/faq-img.png',
  description = 'Ofrecemos desde asesoría, seguridad bajo contrato notariado y calidad mundial.',
  twitterUser = '@criptoanalisis',
  lang = 'ES',
  route = '/',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:locale" content={lang === 'ES' ? 'es_ES' : 'en_US'} />
    <meta property="og:site_name" content={title} />
    <meta
      property="og:url"
      content={`https://blockchainconsultora.com${route}`}
    />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={description} />
    <meta name="twitter:site" content={twitterUser} />
    <meta name="twitter:creator" content={twitterUser} />
  </Head>
);

export default SEO;
