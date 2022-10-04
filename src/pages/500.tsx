import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function InternalError() {
  return (
    <>
      <Head>
        <title>500</title>
      </Head>
      <div className="not-found">
        <div className="iso404Content" role="alert">
          <h1>Error 404</h1>
          <h3> subTitle </h3>
          <p>description</p>
          <button type="button">
            <Link href="/dashboard">
              <a className="isoMenuHolder">
                <span className="nav-text">backButton</span>
              </a>
            </Link>
          </button>
        </div>

        <div className="iso404Artwork">
          <img alt="#" src="/assets/images/rob.png" />
        </div>
      </div>
    </>
  );
}
