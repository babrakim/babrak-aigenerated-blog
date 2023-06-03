import { useState, useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Sidebar from '@/components/Sidebar';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import FormTextarea from '@/components/FormTextarea';
import FormSelect from '@/components/FormSelect';
import Button from '@/components/Button';
import EditorComponent from '@/components/EditorComponent/EditorComponent';

import styles from '@/styles/Home.module.scss';

import Link from 'next/link';
import classNames from 'classnames';

function getFieldFromFormByName({ name, form } = {}) {
  const fields = Array.from(form?.elements);
  return fields.find((el) => el?.name === name);
}

export default function Article() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cleanTitleTag, setCleanTitleTag] = useState('');
  const [cleanMetaTitle, setCleanMetaTitle] = useState('');

  // Function to handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  async function handleOnGenerateText(e) {
    e.preventDefault();

    const { value: prompt } = getFieldFromFormByName({
      name: 'prompt-post',
      form: e.currentTarget,
    });

  const selectedLanguage = document.getElementById('language-select')?.value || 'English-US';
  const selectStyle = document.getElementById('post-style')?.value || 'Tony Robbins';
  const selectedTone = document.getElementById('tone-select')?.value || 'Encouraging';
  const selectedWords = document.getElementById('words-select')?.value || '1200';
  const selectedHeading = document.getElementById('heading-select')?.value || '3';
  const selectedHeadingtag = document.getElementById('headingtag-select')?.value || 'h1,h2';
  const selectedKeywordbold = document.getElementById('keywordbold-select')?.value || '4';
  const selectedFaqs = document.getElementById('faqs-select')?.value || '3';
  const selectedWqa = document.getElementById('wqa-select')?.value || '3';

    
    setIsLoading(true);
    setPost(undefined);


    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        language: selectedLanguage,
        style: selectStyle,
        tone: selectedTone,
        wordcount: selectedWords,
        heading: selectedHeading,
        headingtag: selectedHeadingtag,
        selectedKeywordbold: selectedKeywordbold,
        selectedFaqs: selectedFaqs,
        selectedWqa: selectedWqa,
      }),
    });
    const { data } = await response.json();
    setPost(data);

    setIsLoading(false);


  }

  useEffect(() => {
    if (post && post.titletag) {
      const cleanTag = post.titletag.replace(/<[^>]+>/g, '');
      setCleanTitleTag(cleanTag);
    } else {
      setCleanTitleTag('');
    }
  }, [post]);

  useEffect(() => {
  if (post && post.meta) {
    const regex = /<meta\s+name="([^"]+)"\s+content="([^"]+)"\s*\/>/g;
    const matches = [...post.meta.matchAll(regex)];
    const cleanMetaTitle = {};

    for (const match of matches) {
      const attributeName = match[1];
      const attributeValue = match[2];
      cleanMetaTitle[attributeName] = attributeValue;
    }

    // Convert the cleanMetaTitle object to a string
    const cleanMetaTitleString = JSON.stringify(cleanMetaTitle);

    setCleanMetaTitle(cleanMetaTitle);
  } else {
    setCleanMetaTitle('');
  }

}, [post]);
  return (
    <Layout>
      <Head>
        <title>bitorok - AI Powered Article Writing</title>
        <meta name="description" content="bitorok - Your One-stop Shop for Next-gen Article Writing, Simply provide a prompt or topic " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta httpEquiv="X-UA-Compatible" content="ie=edge" /> 
        <meta property="og:title" content="bitorok - AI Powered Article Writing, Development Services, Courses & Solutions" /> 
        <meta property="og:description" content="Build and innovate with bitorok - the ultimate platform for AI-based content creation, communication, and development services. Discover our cutting-edge courses, solutions, and development options to help your business stay ahead in the AI game." /> 
        <meta property="og:image" content="/cover.png" /> 
        <meta property="og:url" content="https://bitorok.com" /> 
        <meta name="twitter:title" content="bitorok - AI Powered Development Services, Courses & Solutions" /> 
        <meta name="twitter:description" content="Build and innovate with bitorok - the ultimate platform for AI-based content creation, communication, and development services. Discover our cutting-edge courses, solutions, and development options to help your business stay ahead in the AI game." /> 
        <meta name="twitter:image" content="/cover.jpg" /> 
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.pageWrapper}>
        <Sidebar />

        <div
          className={classNames(styles.contentWrapper, {
            [styles.sidebarOpen]: isSidebarOpen,
          })}
        >
          <Section className="px-2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-1">
                      <h2 className="mt-2">⚡</h2>
                    </div>
                    <div className="col-11">
                      <h1 className="fs-2">One-shot article</h1>
                      <span className="fs-6 text-denger">
                        * Please fill all the field for better result withour Error
                      </span>

                      <hr className="border-1 border-top border-secondary" />

                      <Form className={styles.form} onSubmit={handleOnGenerateText}>
                        <FormRow className="form-group">
                          <label>Enter Your Keyword(s):</label>
                          <FormTextarea
                            className="form-control mb-6 block h-48 w-full rounded-lg border border-black/10 bg-success/8 px-4 py-3 text-md font-medium text-black hover:border-white/25 focus:outline-none focus:ring-1 focus:ring-white/80"
                            type="text"
                            name="prompt-post"
                          />
                          <span className="text-danger">use comma ( , ) or use one line after line for multiple keywords</span>
                        </FormRow>

                        <FormRow>
                          <label>Select Language</label>
                          <FormSelect className="form-control" id="language-select">
                            <option value="English-US">English US</option>
                            <option value="English-UK">English UK</option>
                            <option value="Germany-Deutsch">Germany</option>

                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <label>Enter Blog Style:</label>
                          <FormInput type="text" id="post-style" className="form-control"/>
                          <span className="text-danger">Ex: Tim Ferris, Neil Patel, Tony Robbins, Lex Fridman (Input One)</span>
                        </FormRow>

                        <FormRow>
                          <label>Select Tone</label>
                          <FormSelect className="form-control" id="tone-select">
                            <option value="Encouraging">Encouraging</option>
                            <option value="Persuasive">Persuasive</option>
                            <option value="Thoughtful">Thoughtful</option>
                            <option value="Personal">Personal</option>
                            <option value="Witty">Witty</option>
                            <option value="Funny">Funny</option>
                            <option value="Empathetic">Empathetic</option>
                            <option value="Compassionate">Compassionate</option>
                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <label>Words count</label>
                          <FormInput type="text" id="words-select" className="form-control"/>
                          <span className="text-danger">Ex: 1200 (Use atleast double what you need)</span>
                        </FormRow>

                        <FormRow>
                          <label>Number of Heading</label>
                          <FormSelect className="form-control" id="heading-select">
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <label>Enter Heading Tag:</label>
                          <FormInput type="text" id="headingtag-select" className="form-control"/>
                          <span className="text-danger">Ex: h1, h2, h3, h4 ...</span>
                        </FormRow>

                        <FormRow>
                          <label>Select Keyword Blod option</label>
                          <FormSelect className="form-control" id="keywordbold-select">
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <label>Select no of FAQs</label>
                          <FormSelect className="form-control" id="faqs-select">
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <label>Select no of W question-answer</label>
                          <FormSelect className="form-control" id="wqa-select">
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                          </FormSelect>
                        </FormRow>

                        <FormRow>
                          <Button disabled={isLoading}>Generate</Button>
                        </FormRow>
                      </Form>

                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div>
                    <h4>Playground</h4>
                  </div>

                  {post && (
                    <>
                      <div className={styles.postTitle}>
                        <h1 className="fs-4">{post.title}</h1>
                      </div>
                      <EditorComponent
                        initialContent={post.content}
                        className="my-editor-component"
                      />

                      <div className="mt-2">
                        <h4 className="h4">Tags:</h4>
                        {post.tags && <span className="tag">{post.tags.join(', ')}</span>}
                      </div>
                    </>
                  )}

                  {!post && (
                    <>
                      <div className={styles.postTitle}>
                        <h1 className="fs-4 color-secondary">Title</h1>
                      </div>
                      <EditorComponent
                        initialContent="Create something awesome today"
                        className="my-editor-component"
                      />                    
                    </>
                  )}

                    <div className={styles.titleTags}>
                      <h6>Generated Title Tags:</h6>
                      {post && (
                        <>
                          <div className={styles.titleTag}>{cleanTitleTag}</div>
                        </>
                      )}

                      {!post && <p>No generated title tags.</p>}
                    </div>

                    <div className={styles.metaData}>
                      <h6>Generated Meta Tags:</h6>
                      {post && (
                        <>
                          <div className={styles.metaTag}><h4 className="h6">Title: {cleanMetaTitle.title}</h4></div>
                          <div className={styles.metaTag}><h4 className="h6">Description: {cleanMetaTitle.description}</h4></div>
                        </>
                      )}

                      {!post && <p>No generated meta tags.</p>}
                    </div>

                    <div className={styles.faqs}>
                      <h6>Related FAQs:</h6>
                      {post && (
                        <>
                          
                          <div dangerouslySetInnerHTML={{ __html: post.faq }} />
                        </>
                      )}

                      {!post && <p>No related FAQs.</p>}
                    </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}
