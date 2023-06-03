import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const shape = {
  keywords: '1. human story, 2. people in earth, 3. superman',
};


export default async function handler(req, res) {
  const { topic } = JSON.parse(req.body);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'assistant', content: JSON.stringify(shape) },
      {
        role: 'system',
        content: `Generate related keywords for the topic: ${topic}`,
      },
    ]
  });

 



const keywords = JSON.parse(completion.keywords.choices[0].message.content);
  console.log(keywords);
  res.status(200).json({
    data: keywords
  })

}


