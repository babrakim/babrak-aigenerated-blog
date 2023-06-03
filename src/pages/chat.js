import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import Image from 'next/image';


function getFieldFromFormByName({ name, form } = {}) {
  const fields = Array.from(form?.elements);
  return fields.find((el) => el?.name === name);
}

function isContentCode(content) {
  const codeRegex = /```[\s\S]*?```|`[^`\n\r]+`/; // Match triple backticks code blocks or inline code
  return codeRegex.test(content);
}

function formatCode(content) {
  const lines = content.split('\n');
  const indentedLines = lines.map(line => `  ${line}`); // Add two spaces of indentation to each line
  return indentedLines.join('\n'); // Join the lines with line breaks
}

function formatMessageContent(content) {
  if (isContentCode(content)) {
    return formatCode(content);
  } else {
    return `<span class="plainText">${content}</span>`;
  }
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function handleSendMessage(e) {
    e.preventDefault();

    const { value: message } = getFieldFromFormByName({
      name: 'chat-message',
      form: e.currentTarget,
    });

    setIsLoading(true);

    setMessages(prevMessages => [
      ...(prevMessages || []),
      { role: 'user', content: message },
    ]);

    const { data } = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: message,
      }),
    }).then(r => r.json());

    setIsLoading(false);

    const isCode = isContentCode(data);
    const formattedContent = isCode ? formatCode(data) : data;
    setMessages(prevMessages => [
      ...(prevMessages || []),
      { role: 'assistant', content: formattedContent, isCode },
    ]);

    setMessageInput(''); // Reset the input field
  }

  function handleCopyButtonClick(index) {
  const selection = window.getSelection();
  const range = document.createRange();
  const selectedContentNode = document.getElementById(`selectedContent-${index}`);
  range.selectNode(selectedContentNode);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
}


  return (
    <Layout>
      <Head>
        <title>bitorok - openAI Powered Chat Conversation</title>
        <meta name="description" content="bitorok - Your One-stop Shop for Next-gen Article Writing, Image Generation & Chatbot Services " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta http-equiv="X-UA-Compatible" content="ie=edge" /> 
        <meta property="og:title" content="bitorok - AI Powered Development Services, Courses & Solutions" /> 
        <meta property="og:description" content="Build and innovate with bitorok - the ultimate platform for AI-based content creation, communication, and development services. Discover our cutting-edge courses, solutions, and development options to help your business stay ahead in the AI game." /> 
        <meta property="og:image" content="/cover.png" /> 
        <meta property="og:url" content="https://bitorok.com" /> 
        <meta name="twitter:title" content="bitorok - AI Powered Development Services, Courses & Solutions" /> 
        <meta name="twitter:description" content="Build and innovate with bitorok - the ultimate platform for AI-based content creation, communication, and development services. Discover our cutting-edge courses, solutions, and development options to help your business stay ahead in the AI game." /> 
        <meta name="twitter:image" content="/cover.jpg" /> 
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Section>
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className={styles.chat}>
                <div className={styles.chatHistory}>
                  <ul className="m-b-0">
                    {messages &&
                      messages.map((msg, index) => (
                        <li
                          key={index}
                          className={styles.clearfix}
                          ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                          <div className={styles.messageData}>
                            {msg.role === 'user' ? (
                              
                              <Image src="/user.png" alt="userImage" className={styles.avatar} width={30} height={30} />
                            ) : (
                              
                              <Image src="/chatai-avatar.png" alt="chatImage" className={styles.avatar} width={30} height={30} />
                            )}
                          </div>
                          <div>
                            {msg.role === 'user' ? (
                              <div className={styles.myMessage}>{msg.content}</div>
                            ) : (
                              <div
                                className={`${styles.message} ${msg.isCode ? styles.codeMessage : ''}`}
                              >
                                {msg.isCode ? (
                                  <pre
                                    className={styles.codeBlock}
                                    id={`selectedContent-${index}`}
                                    onClick={() => handleCopyButtonClick(index)}
                                  >
                                    {msg.content}
                                  </pre>
                                ) : (
                                  <span id={`selectedContent-${index}`}>{msg.content}</span>
                                )}
                                {msg.isCode && (
                                  <Button onClick={() => handleCopyButtonClick(index)}>Copy</Button>
                                )}

                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <Form className={styles.form} onSubmit={handleSendMessage}>
                  <div className={`${styles.message} ${styles.clearfix}`}>
                    <div className="input-group mb-3 row no-gutters p-0 border rounded bg-white" style={{ boxShadow: '0 0 30px rgba(28, 39, 60, 0.08)' }}>
                      <div className="col-sm-11">
                        <FormInput
                          type="text"
                          name="chat-message"
                          className="form-control border-0 bg-white"
                          placeholder="Send a message"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-1" style={{ borderLeft: '1px solid #ccc' }}>
                        <button className="btn" disabled={isLoading}>
                          {isLoading ? '...' : (
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
