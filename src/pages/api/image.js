import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try{


  const { prompt, size } = JSON.parse(req.body);

  const response = await openai.createImage({
      prompt,
      n: 1,
      size: getImageSize(size)
    });

    res.status(200).json({
      image: response.data.data[0].url
    });
  } catch (error) {
    console.error('OpenAI API Error:', error.response.data);
    res.status(500).json({ error: 'An error occurred' });
  }
}


function getImageSize(size) {
  if (size === 'small') {
    return '265x265';
  } else if (size === 'medium') {
    return '512x512';
  } else if (size === 'large') {
    return '1024x1024';
  }
}
