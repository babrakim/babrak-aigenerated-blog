import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.scss';
import { useRouter } from 'next/router';

function Files() {
  const [fileData, setFileData] = useState(null);
  const router = useRouter();
  const { fileName } = router.query;

  useEffect(() => {
    if (fileName) {
      fetch(`/api/files/${fileName}`)
        .then((response) => response.json())
        .then((data) => setFileData(data))
        .catch((error) => console.error('Error fetching file:', error));
    }
  }, [fileName]);

  return (
    <Layout>
      <Head>
        <title>File Details</title>
        <meta name="description" content="File Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageWrapper}>
        <div className="container">
          <h1>File Details</h1>
          {fileData ? (
            <>
              <h2>Title: {fileData.title}</h2>
              <div>Content: {fileData.content}</div>
              <div>Tags: {fileData.tags && fileData.tags.join(', ')}</div>
              <div>Meta: {fileData.meta}</div>
              <div>FAQs: {fileData.faq}</div>
            </>
          ) : (
            <div>Loading file data...</div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Files;
