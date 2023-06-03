import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uniqueID = uuidv4(); // Generate a unique ID

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const shape = {
  title: 'Technology title',
  content: '<p>A blog post about current technology</p>',
  tags: ['technology', 'innovation', 'trends'],
  meta:'<meta name="title" content="content"/> - <meta name="description" content="content"/>',
  faq:'<div>Who win the world cup 2018?</div>',
  titletag:'<title>Title of the webpage</title>',
}


export default async function handler(req, res) {
  const { prompt, language, style, tone, wordcount, heading, headingtag, selectedKeywordbold, selectedFaqs, selectedWqa } = JSON.parse(req.body)
  console.log({ prompt, language, style, tone, wordcount, heading, headingtag, selectedKeywordbold, selectedFaqs, selectedWqa });

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
  {
  role: 'system',
  content: `
    As an experienced professional blog writer, you will create a high-quality blog post tailored to the user's specific requirements. The topic of the blog post will revolve around ${prompt}, and it should be written in ${language} language. The total word count for the blog post should be approximately ${wordcount} words. Emphasize the ${selectedKeywordbold} keywords by using bold formatting throughout the post to ensure they stand out. To provide valuable information, address ${selectedWqa} Wh-question and answer pairs that are relevant to the topic.
    For a well-structured blog post, include ${heading} headings, utilizing ${headingtag} HTML heading tags wherever applicable. Enhance user experience and improve SEO by incorporating meta tags that contain a compelling call to action related to the content. Also you can create a HTML title tag which will use for landing page website title. Remember, you must create this titletag different from blog post title. Additionally, generate ${selectedFaqs} frequently asked questions based on the content to provide further value to the readers.
    When it comes to writing style, craft the blog post in the ${style} style to create engaging and compelling content. Maintain a ${tone} tone throughout the post to effectively convey the intended emotions and deliver the desired message.
    Drawing upon your expertise as a professional blog writer, your goal is to create a top-quality blog post that not only meets but exceeds the user's requirements and expectations. You have the ability to create long-form blog posts, incorporating all HTML heading tags from h1 to h6.
    Remember to provide a compelling blog post title related to the given list of SEO keywords. Please provide the title and the HTML content in JSON format.
    Together, let's create an exceptional piece of content that will captivate and engage the audience!
  `
},
  {
    role: 'user',
    content: `Create a blog post on one of the following topics: ${prompt}`
  },
  {
    role: 'assistant',
    content: JSON.stringify(shape)
  },
  {
    role: 'user',
    content: `Craft a captivating blog post tailored to your target audience using the power of carefully selected keywords ${prompt}. Generate engaging content that showcases your expertise and resonates with your readers, while maintaining the desired language, style, tone, word count, and even specific heading tags. Elevate your blog's visibility and user experience with well-crafted meta tags and informative FAQs ${prompt} in ${language} Language must contain ${wordcount} words in the blog post content. Please highlight at least ${selectedKeywordbold} keywords inside the blog content by using HTML <b> tags. Additionally, ensure the inclusion of ${selectedWqa} Wh-question and answer type content to provide valuable information to your readers. To enhance readability and structure, incorporate ${heading} headings within the post, and use ${headingtag} heading tags in HTML format where applicable. To optimize your blog post for search engines and user engagement, create user-friendly meta tags that include a compelling call to action related to the content. Also create a completly differet HTML title tag for stand alone identity on this content for landingpage use, please create this titletag different from blog post title. Furthermore, generate ${selectedFaqs} frequently asked questions and provide the best possible answers based on the content. This will further enhance the value and relevance of your blog post. In terms of style, write this blog post in a ${style} manner, ensuring it aligns with your brand's voice and reflects your expertise. Maintain a ${tone} tone throughout the content to establish a consistent and engaging connection with your readers. Now, let's create a compelling blog post that incorporates all these requirements and brings your vision to life!`
  }
]
    
  });

  // Extract the generated blog post, title, meta tags, and FAQ
  const generatedBlogPost = completion.data?.choices?.[0]?.message?.content;

  const content = JSON.parse(completion.data.choices[0].message.content);
  console.log(generatedBlogPost);

  // Save the generated article as a JSON file
  const timestamp = new Date().getTime(); // Get the current timestamp
  const fileName = `generated-article-${timestamp}-${uniqueID}.json`; // Generate a unique file name using the ID
  
  const filePath = path.join(process.cwd(), 'content', fileName);

  // Save the generated article as a JSON file
  fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File saved successfully:', filePath);
});

  res.status(200).json({
    data: content
  })
}
