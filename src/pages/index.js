import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import ArticleSVG from '@/components/Navbar/articleSVG';
import ChatSVG from '@/components/Navbar/chatSVG';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(25);

  useEffect(() => {
    const fetchFileList = async () => {
      const getFileTitle = async (fileName) => {
        try {
          console.log('Fetching file title for:', fileName);
          const response = await fetch(`/api/fileTitle?fileName=${encodeURIComponent(fileName)}`);
          console.log('API request:', response.url);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched file title:', data.content.title);
            return data.content.title;
          } else {
            console.error('Failed to fetch file content');
          }
        } catch (error) {
          console.error('An error occurred', error);
        }
        return '';
      };

      const fetchFileTitles = async (fileNames) => {
        const titlePromises = fileNames.map(async (fileName) => {
          const fileTitle = await getFileTitle(fileName);
          return { fileName, fileTitle };
        });

        return Promise.all(titlePromises);
      };

      try {
        const response = await fetch('/api/filesList');
        if (response.ok) {
          const data = await response.json();
          const fileTitles = await fetchFileTitles(data.files);
          setFileList(fileTitles);
        } else {
          console.error('Failed to fetch file list');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchFileList();
  }, []);

  // Pagination logic
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = fileList.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(fileList.length / filesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <Layout>
      <Head>
        <title>babrak - AI Powered Article Writing, Image Generation & Chat Services</title>
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
          <div className="row">
            
            <div className="px-4 py-5 my-5 text-center">
              
              <h1 className="display-5 fw-bold">Meet Your New AI Daily Partner</h1>
              <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Build and innovate with your very own AI Writting Tools - the ultimate platform for AI-based content creation, communication, and development services. </p>                
              </div>            
            </div>
            
            <div className="col-lg-12">
              <h4>Recent Work</h4>
            </div>
            
            <div className="col-lg-12 p-4">
              <div className="row">
                
                
                <div className="col-lg-6 bg-light p-2"><b>Title</b></div>
                <div className="col-lg-3 bg-light p-2"><b>Created by</b></div>
                <div className="col-lg-3 bg-light p-2"><b>Date</b></div>
                

                {currentFiles.map(({ fileName, fileTitle }) => {
                const parts = fileName.split('-');
                const createdByName = 'babrak'; // Replace with the actual creator name

                const timestamp = parts[2];
                const date = new Date(parseInt(timestamp));
                const formattedDate = format(date, 'dd MMM yyyy hh:mm a');

                return (
                  <React.Fragment key={fileName}>
                    <div className="col-lg-6 border-bottom p-2">
                      <Link href={`/${fileName}`} className={styles.fileTitle}>
                        {fileTitle}
                      </Link>
                    </div>
                    <div className="col-lg-3 border-bottom p-2">{createdByName}</div>
                    <div className="col-lg-3 border-bottom p-2"><p className="text-right">{formattedDate}</p></div>
                  </React.Fragment>
                );
              })}
            </div>
            </div>
           
            <div className="row">
              <div className="col-lg-12">
                <nav className={styles.paginationWrap}>
                  <ul className="pagination">
                    {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(pageNumber + 1)}
                        >
                          {pageNumber + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
           
          </div>
        </div>
      </Section>
    </Layout>
  );
}
