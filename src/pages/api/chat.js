import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const conversation = []; // Maintain the conversation history

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  console.log('Received payload:', { prompt });

  // Add user message to the conversation history
  conversation.push({ role: 'user', content: prompt });

  // Generate assistant reply
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversation, // Send the entire conversation history as context
  });

  // Add assistant reply to the conversation history
  const assistantReply = completion.data.choices[0].message;
  conversation.push(assistantReply);

  res.status(200).json({
    data: assistantReply.content,
  });
}
