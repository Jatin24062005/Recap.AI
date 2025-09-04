import axios from 'axios';

export async function summarizeTranscript(transcriptText, retries = 3, delay = 1000) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful meeting summarizer.',
          },
          {
            role: 'user',
            content: `
Here’s a meeting transcript:
${transcriptText}

👉 Give me:
1. A bullet-point summary
2. A 500-word detailed summary
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(`⏳ Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      return summarizeTranscript(transcriptText, retries - 1, delay * 2); // exponential backoff
    }

    console.error('❌ Failed to summarize transcript:', error.message);
    throw error;
  }
}
