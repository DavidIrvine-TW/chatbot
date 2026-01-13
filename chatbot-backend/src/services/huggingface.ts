
import axios from 'axios';
import { getKnowledgeBasePrompt } from '../data/knowledgeBase';

interface Message {
  role: string;
  content: string;
}

export async function generateChatResponse(
  message: string,
  conversationHistory: Message[] = []
): Promise<string> {


  const apiKey = process.env.HUGGINGFACE_API_KEY;


  if (!apiKey || apiKey === '') {
    throw new Error('Hugging Face API key not configured');
  }

  const systemPrompt = getKnowledgeBasePrompt();


  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',  
      content: msg.content
    })),
    { role: 'user', content: message }
  ];

  const modelSettings = {
    model: 'meta-llama/Llama-3.2-3B-Instruct',
    max_tokens: 500,
    temperature: 0.7,
    top_p: 0.95,
    messages: messages
  }

  interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  }

  const response = await axios.post<ChatCompletionResponse>(
    'https://router.huggingface.co/v1/chat/completions',  modelSettings,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  );


  return response.data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
}
