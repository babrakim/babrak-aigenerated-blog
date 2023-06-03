import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const shape = {
  title: 'Technology title',
  content: '<p>A blog post about current technology</p>',
  tags: ['technology', 'innovation', 'trends'],
  publicationDate: '2023-05-18',
};

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
          You are an assistant that creates new blog posts on a given topic.
          You should provide a title and HTML content in JSON format.
        `,
      },
      {
        role: 'user',
        content:
          "Create a blog post on one of the following topics: technology, fashion, health and wellness, travel, finance, entertainment, food and recipes, sports, home décor, beauty and skincare, automotive, fitness, parenting, self-improvement, business and entrepreneurship, education, pet care, environmental sustainability, product reviews and descriptions, current events and news.",
      },
      {
        role: 'assistant',
        content: JSON.stringify(shape),
      },
      {
        role: 'user',
        content: `Create a blog post with the following keywords: ${prompt}.`,
      },
    ],
  });

  const metadata = completion.metadata?.choices?.[0]?.message?.content;
  console.log(metadata);
  res.status(200).json({
    metadata,
  });
}
