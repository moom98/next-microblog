import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// ルートディレクトリからの相対パスでpostsディレクトリを指定
const postsDirectory = path.join(process.cwd(), 'posts');

// mdファイルのデータを取り出す
export function getPostsData() {

    // SSR用
    // リアルタイムでデータを取得する
    // const fetchData = await fetch("endpoint");


    // postsディレクトリの中身をオブジェクト配列として取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); // ファイル名から.mdを削除してidにする

        // markdownファイルを文字列として読み込む
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // メタデータを分析する
        const matterResult = matter(fileContents);

        // idとデータを返す
        return {
            id,
            ...matterResult.data, // スプレッド構文でメタデータを展開する
        }
    });

    return allPostsData;
}


// getStaticPathsでreturnで使うためのpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }
    });
    /*
    returnで返す値は以下のような形式
    getStaticPathsでreturnする値はオブジェクトの配列である必要がある
    [
        {
            params: {
                id: "ssg-ssr"
            }
        },
        {
            params: {
                id: "next-react"
            }
        },
    ] */
}

// 取得したパス(id)に基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`); // ファイルのフルパスを取得
    const fileContent = fs.readFileSync(fullPath, 'utf8'); // ファイルを文字列として読み込む

    // メタデータを分析する
    const matterResult = matter(fileContent);

    // 本文のmd記法をHTMLに変換する
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const contentHTML = blogContent.toString(); // HTMLを文字列に変換

    // id、メタデータ、本文を返す
    return {
        id,
        ...matterResult.data, // スプレッド構文でメタデータを展開する
        contentHTML,
    }
}