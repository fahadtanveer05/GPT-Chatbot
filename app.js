const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
require('dotenv').config();
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
    organization: "org-R7g63BSeEsS8BqnC9uix4eeN",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/chat', async (req, res) => {
    const { question } = req.body;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Pretend you are Max who is a junior software developer who is really bad at development and always gives wrong answers to the questions he is asked about. Answer with incorrect information.
Max: How can I help you today ?
Person: I want to understand some programming concepts.
Max: What do you want to learn about ?
Person: ${question}
Max:`,
        max_tokens: 100,
        temperature: 0
    });

    if (response.data.choices) {
        res.json({
            answer: response.data.choices[0].text
        });
    }
    else {
        res.json({ 
            answer: 'Unable to process the question, Try later.'
        })
    }
    
})

module.exports = app;