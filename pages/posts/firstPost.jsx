import Head from "next/head";
import Link from "next/link";

export default function firstPost() {
    return (
        <div>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <Link href="/">ホームへもどる</Link>
        </div>
    );
}

