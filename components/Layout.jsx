import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Maya Uematsu"
export const siteTitle = "Next.js Blog"

function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                {/* // homeの有無でページの表示を切り替える */}
                {home ? (
                    <>
                        <img className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} src="/images/profile.png" alt="maya" />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img className={`${utilStyles.borderCircle} ${styles.headerLowerImage}`} src="/images/profile.png" alt="maya" />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
            </header>
            <main>
                {children}
                {/* ページがhomeではなかった(=下層だった)場合 */}
                {!home && (
                    <div>
                        <Link href="/">ホームへ戻る</Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Layout;