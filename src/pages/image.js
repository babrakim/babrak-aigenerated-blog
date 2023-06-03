import { useState } from 'react';
import Head from 'next/head'

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import Button from '@/components/Button';
import Image from 'next/image';
import styles from '@/styles/Home.module.scss'

import Link from 'next/link';

function getFieldFromFormByName({ name, form } = {}) {
  const fields = Array.from(form?.elements);
  return fields.find(el => el?.name === name);
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnGenerateText = async (e) => {
    e.preventDefault();

    const inputField = e.currentTarget.querySelector('input[name="prompt-post"]');
    const inputStyle = e.currentTarget.querySelector('input[name="prompt-style"]');
    
    const prompts = inputField.value;
    const style = inputStyle ? inputStyle.value : '';
    if (!prompts) {
      alert('Please enter a description.');
      return;
    }

    setIsLoading(true);
    setPosts([]);

    const imageSizes = ['small', 'medium', 'large'];
    const { image } = await fetch('/api/image', {
    method: 'POST',
    body: JSON.stringify({
      prompt: `Generate a ${style} style image that complements the content of ${prompts} with relevant visuals.
      Focus on creating an image that conveys the message and narrative without the inclusion of any text.
      Emphasize the power of visual storytelling by relying solely on visual elements in the image.
      `,
      size: 'large' // Specify the largest size for generating the image
    })
  }).then(r => r.json());

  const imagePosts = imageSizes.map(size => ({
    size,
    image: resizeImage(image, size) // Resize the image URL to different sizes
  }));

  setPosts(imagePosts);
  setIsLoading(false);
  inputField.value = '';
  };

  function resizeImage(imageUrl, size) {
    const width = size === 'small' ? 265 : (size === 'medium' ? 512 : 1024);
    const height = size === 'small' ? 265 : (size === 'medium' ? 512 : 1024);

    const url = new URL(imageUrl);
    url.searchParams.set('width', width.toString());
    url.searchParams.set('height', height.toString());

    return url.toString();
  }

  return (
    <Layout>
      <Head>
        <title>bitorok - AI Powered Image Generation</title>
        <meta name="description" content="bitorok - Your One-stop Shop for Next-gen Image Generation, Just describe your desired image or provide a prompt " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta httpEquiv="X-UA-Compatible" content="ie=edge" /> 
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
        <Container>
         
          <Form className={styles.form} onSubmit={handleOnGenerateText}>
            <div className="input-group mt-2">
              <label className="fs-6 text-center">Start with a detailed description</label>
            </div>
            <div className="input-group mb-3 row no-gutters p-0 border rounded bg-white" style={{ boxShadow: '0 0 30px rgba(28, 39, 60, 0.08)' }}>
              <div className="col-sm-7">
                <FormInput type="text" name="prompt-post" className="form-control border-0 bg-white mt-1" />
              </div>
              <div className="col-sm-3">
                
                <FormSelect className="form-control mt-1" name="prompt-style">

                  <option value="">None</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Modern">Modern</option>
                  <option value="Impressionist">Impressionist</option>
                  <option value="Pop Art">Pop Art</option>
                  <option value="Cubism">Cubism</option>
                  <option value="Surrealism">Surrealism</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Graffiti">Graffiti</option>
                   
                </FormSelect>

              </div>
              <div className="col-sm-2" style={{borderLeft: '1px solid #ccc'}}>
                <button className="btn" disabled={isLoading}>
                  {isLoading ? 'Generate...' : 'Generate'}
                </button>
              </div>
            </div>
          </Form>

          <div className="container-fluid">
         {posts.length > 0 && (
            <div className="row">
              {posts.map(post => (
                <div key={post.size} className="col-lg-12 border p-4">
                  <Image
                    src={post.image}
                    alt="Image"
                    width={post.size === 'small' ? 265 : (post.size === 'medium' ? 512 : 1024)}
                    height={post.size === 'small' ? 265 : (post.size === 'medium' ? 512 : 1024)}
                    className={`${styles.svgImage} rounded mx-auto d-block`}
                  />
                  <h4 className="fs-5 text-center p-4">{post.size === 'small' ? 'Small' : (post.size === 'medium' ? 'Medium' : 'Large')}</h4>
                  <p className="">
                    {post.size === 'small' ? '' : (post.size === 'medium' ? '' : '')}
                  </p>
                </div>
              ))}
            </div>
          )}
          </div>
        </Container>
      </Section>
    </Layout>
  )
}
