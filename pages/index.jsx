import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyle from '@/styles/utils.module.css'
import { getPostsData } from '@/lib/post'

const inter = Inter({ subsets: ['latin'] })

// SSGの場合
// getStaticProps: 外部から一度だけデータを取得する
export async function getStaticProps() {
  const allPostsData = getPostsData();// id, title, date, thumbnail
  // console.log(allPostsData);
  return {
    props: {
      allPostsData,
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
          <p>React / Next.jsを勉強中です。</p>
        </section>

        <section>
        <h2>📝Next.jsを使ってみる</h2>

        <div className={styles.grid}>
          {allPostsData.map(({id, title, data, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img className={styles.thumbnailImage} src={`${thumbnail}`} alt="" />
            </Link>
            <Link href={`/posts/${id}`}>
              <span className={utilStyle.boldText}>{title}</span>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              {data}
            </small>
          </article>
            ))}
        </div>
        </section>
      </Layout>
    </>
  )
}
