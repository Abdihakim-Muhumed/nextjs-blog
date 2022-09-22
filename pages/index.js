import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps(){
  const allPostsData = getSortedPostsData();
  return{
    props: {
      allPostsData,
    }
  }
}


export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi I am Abdihakim Muhumed, a software engineer and a tech enthusiast based in Nairobi, Kenya.
          
        </p>
        <p>
          (This is a simple blogging website  i have built on 
          <a href="https://nextjs.org/learn">this Next.js tutorial</a>.)
        </p>
      </section>
      <section className={'${utilStyles.headingMd} ${utilStyles.padding1px}'}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              </li>
            ))}
          </ul>
      </section>
    </Layout>
  )
}
