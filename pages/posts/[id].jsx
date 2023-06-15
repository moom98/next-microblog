import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/post";
import utilStyle from "@/styles/utils.module.css";
import Head from "next/head";

// 動的ルーティング設定のための関数 pathsがルーティング設定になる
// 開発環境なら毎リクエスト時、本番環境ならビルド時のみに実行される
export async function getStaticPaths() {
    // ブログ投稿データのファイル名(id)を取得する
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false, // pathsが存在しないとき、falseにしておくと404ページになる/true or blockingにするとNext.jsが動的にページを生成する
    }
}

// getStaticPathsでパスを取得するためにgetStaticPropsを使う
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    }
}

// 本文
export default function post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyle.headingX1}>
                    {postData.title}
                </h1>
                <div className={utilStyle.lightText}>
                    {postData.date}
                </div>

                {/* HTMLをそのまま表示する */}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
            </article>
        </Layout>
    );
}