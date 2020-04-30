import Link from 'next/link';
import * as React from 'react'
import Layout from "../components/Layout";
import ImageContainer from "../components/ImageContainer";

export default function Index() {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <ImageContainer>

            </ImageContainer>
        </Layout>
    );
}