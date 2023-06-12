import Link from "next/link";

export default function firstPost() {
    return (
        <div>
            <h1>First Post</h1>
            <Link href="/">ホームへもどる</Link>
        </div>
    );
}

