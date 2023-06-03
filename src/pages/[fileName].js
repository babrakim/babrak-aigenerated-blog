import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.scss';
import EditorComponent from '@/components/EditorComponent/EditorComponent';
import { useRouter } from 'next/router';



function Files() {
  const [fileData, setFileData] = useState(null);
  const router = useRouter();
  const { fileName } = router.query;

  useEffect(() => {
    if (fileName) {
      fetch(`/api/${encodeURIComponent(fileName)}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('File Data:', data);
          setFileData(data);
        })
        .catch((error) => console.error('Error fetching file:', error));
    }
  }, [fileName]);

  

  console.log('File Data:', fileData);

  // Extract the content from the title tag
  const titleContent = fileData?.titletag ? fileData.titletag.replace(/<[^>]+>/g, '') : '';

  const renderMetaTags = () => {
  if (fileData && fileData.meta) {
    const metaTags = fileData.meta.match(/content="([^"]+)"/g);

    if (metaTags) {
      return metaTags.map((tag, index) => {
        const content = tag.match(/content="([^"]+)"/)[1];
        return (
          <div key={index}>
            <p>{content}</p>
          </div>
        );
      });
    }
  }
  return null;
};

  
  return (
    <Layout>
      <Head>
        <title>File Details</title>
        <meta name="description" content="File Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageWrapper}>
        <div className="container mt-4">
          
          {fileData ? (
            <>
              <h4>{fileData.tags && fileData.tags.join(', ')}</h4>
              
              <div>
                <div className={styles.postTitle}>
                  <h1 className="fs-4">{fileData.title}</h1>
                </div>

                <EditorComponent
                  initialContent={fileData.content}
                  className="my-editor-component"
                />

              </div>

              <div className="mt-4">
                <h3>Tags:</h3>
                {fileData.tags && fileData.tags.join(', ')}
              </div>

              <div className={styles.titleTags}>
                      <h6>Generated Title Tags:</h6>
                      {fileData.titletag && (
                        <>
                          <div className={styles.titleTag}>{titleContent}</div>
                        </>
                      )}

                      {!fileData.titletag && <p>No generated title tags.</p>}
                    </div>

              <div className={styles.metaData}>
                <h6>Generated Meta Tags:</h6>
                {fileData.meta && (
                <>
                  <div className={styles.metaTag}>{renderMetaTags()}</div>
                </>
                )}

                {!fileData.meta && <p>No generated meta tags.</p>}
              </div>


              <div className={styles.faqs}>
                
                {fileData.faq && (
                  <>
                  <div className={styles.faq}><div dangerouslySetInnerHTML={{ __html: fileData.faq }} /></div>
                  </>
                )}

                {!fileData.faq && <p>No related FAQs.</p>}
              </div>


              <div className="mt-4">
                
                {fileData.faq}
                
              </div>

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
