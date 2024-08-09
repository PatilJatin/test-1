# aishowprep


any elements you need, ping
https://tailwindui.com/components


## and here's how to perform search with site specificly


```javascript

const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

// Replace with your OpenAI API key
const openaiApiKey = 'your_openai_api_key';

// Replace with your SerpAPI key
const serpapiKey = 'your_serpapi_key';

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

async function searchGoogle(query, site = null) {
  if (site) {
    query = `site:${site} ${query}`;
  }

  const params = {
    engine: 'google',
    q: query,
    api_key: serpapiKey,
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { params });
    return response.data.organic_results || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

function summarizeResults(results) {
  return results.map(result => {
    const title = result.title || '';
    const snippet = result.snippet || '';
    const link = result.link || '';
    return `Title: ${title}\nSnippet: ${snippet}\nLink: ${link}\n`;
  }).join('\n\n');
}

async function main() {
  const query = 'OpenAI web search example';
  const site = 'example.com';  // Replace with the desired site

  const results = await searchGoogle(query, site);

  if (results.length === 0) {
    console.log('No results found.');
    return;
  }

  const summaries = summarizeResults(results);

  const prompt = `Summarize the following search results:\n\n${summaries}`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });

    const summary = response.data.choices[0].text.trim();
    console.log('Summary of search results:');
    console.log(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}

main();


```


## here's free way to do that search


```javascript

const puppeteer = require('puppeteer');
const { Configuration, OpenAIApi } = require('openai');

// Replace with your OpenAI API key
const openaiApiKey = 'your_openai_api_key';

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

async function searchGoogle(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  await page.type('input[name=q]', query);
  await page.keyboard.press('Enter');

  await page.waitForSelector('div#search');

  const results = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('div.g'));
    return items.map(item => {
      const title = item.querySelector('h3')?.innerText || '';
      const snippet = item.querySelector('.IsZvec')?.innerText || '';
      const link = item.querySelector('a')?.href || '';
      return { title, snippet, link };
    });
  });

  await browser.close();
  return results;
}

function summarizeResults(results) {
  return results.map(result => {
    const title = result.title || '';
    const snippet = result.snippet || '';
    const link = result.link || '';
    return `Title: ${title}\nSnippet: ${snippet}\nLink: ${link}\n`;
  }).join('\n\n');
}

async function main() {
  const query = 'OpenAI web search example';

  const results = await searchGoogle(query);

  if (results.length === 0) {
    console.log('No results found.');
    return;
  }

  const summaries = summarizeResults(results);

  const prompt = `Summarize the following search results:\n\n${summaries}`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });

    const summary = response.data.choices[0].text.trim();
    console.log('Summary of search results:');
    console.log(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}

main();


```

- [ ] create landingpage (Teemu does this)
- [ ] create login popup for landing page / licensing checker checks if license is valid
UserEmail, license_key, license_expiration_date

example:
	License Key: 5NW2NCQ1UY
	Today's Date: 2024-08-06
	License Expiration Date: 2025-02-02

- [ ] create registration page
- [ ] create database for items

- [ ] create showprep design (main newsletter)

navbar, hero, content

ref
https://tailwindui.com/components
whatever looks good

if you need customize colors, 
https://tailwindcss.com/docs/customizing-colors


- [ ] create helpers prompt file

all prompts should be in one file which we are calling from code

- [ ] create timed update UTC00:00 refresh and save

this can be manual for superuser or if we can (vercel function) automatic

- [ ] superuser should be able to edit the entries *wishlist top

- [ ] we create generate PDF and add traceable function to it (puppeteer)
check exportPDF

for tracking


```javascript


import React from 'react';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

const GeneratePDF = () => {
  const createPDF = () => {
    // Create a document
    const doc = new PDFDocument();

    // Add metadata
    doc.info.Title = 'Sample PDF';
    doc.info.Author = 'Your Name';
    doc.info.Subject = 'Adding Metadata with PDFKit';
    doc.info.Keywords = 'PDF, PDFKit, Metadata, Traceable';
    doc.info.CreationDate = new Date();

    // Add some content
    doc.text('Hello, this is a sample PDF with metadata.');

    // Finalize the PDF and get the blob
    const stream = doc.pipe(blobStream());

    // Finalize the PDF document
    doc.end();

    // Stream the PDF to a blob and create a URL to download
    stream.on('finish', function () {
      const url = stream.toBlobURL('application/pdf');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sample.pdf';
      link.click();
    });
  };

  return (
    <div>
      <button onClick={createPDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;


```
	npm install pdfkit blob-stream

## tracking PDF

this might work as well

	npm install uuid


```javascript

import React from 'react';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import { v4 as uuidv4 } from 'uuid';

const GeneratePDF = () => {
  const createPDF = () => {
    // Create a document
    const doc = new PDFDocument();

    // Generate a unique identifier
    const uniqueId = uuidv4();

    // Add metadata
    doc.info.Title = 'Sample PDF';
    doc.info.Author = 'Your Name';
    doc.info.Subject = 'Adding Metadata with PDFKit';
    doc.info.Keywords = 'PDF, PDFKit, Metadata, Traceable';
    doc.info.CreationDate = new Date();
    doc.info.UniqueId = uniqueId; // Custom metadata field

    // Add some content
    doc.text(`Hello, this is a sample PDF with metadata.\nUnique ID: ${uniqueId}`);

    // Finalize the PDF and get the blob
    const stream = doc.pipe(blobStream());

    // Finalize the PDF document
    doc.end();

    // Stream the PDF to a blob and create a URL to download
    stream.on('finish', function () {
      const url = stream.toBlobURL('application/pdf');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sample.pdf';
      link.click();
    });
  };

  return (
    <div>
      <button onClick={createPDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;

```





### AI Showprep Service Example

**Wednesday // 7th August 2024** <hero>

**AISHOWPREP.COM**

---

open trendingcontent on separate window button
<!-- this is a banner -->

### HEADLINE TEXTERS

<!-- summarize headlines here -->

- What alarm clock sound or song do you use? <bullet bodytext>
- Do you have a type that your friends think is weird or wrong? <bullet bodytext>
- Do you consider yourself lucky, and if you do, why? <bullet bodytext>

---

### OFFICIAL TOP 40 (web search) 

<!-- <bullet bodytext> -->

1.	“Did It First” by Ice Spice and Central Cee
2.	“Beautiful Things” by Benson Boone
3.	“Hot To Go” by Chappell Roan

prompt to openAI and google: 

	create short list of this week's UK top 3 songs, only give me the list

use sourceURL: https://www.officialcharts.com/charts/singles-chart/


---

### BILLBOARD HOT 100 (web search)
prompt:
	create short list of this week's US top 3 songs, only give me the list
<!-- <bullet bodytext> -->

1.	“A Bar Song (Tipsy)” by Shaboozey
2.	“I Had Some Help” by Post Malone featuring Morgan Wallen
3.	“Not Like Us” by Kendrick Lamar
 
use sourceURL: https://www.billboard.com/charts/hot-100/

---

### IMPOSSIBLE TRIVIA

prompt:
	as an example for trivia: One in five couples do this every night? (Sleep in separate rooms), here's another example: "Can you name three consecutive days without using the words Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday? (Answer: Yesterday, Today and Tomorrow)"
	continue and give me 5 random trivia with answers', only give me the list

### TODAY IN HISTORY

prompt
	give a brief bullet point list of what has happened on day ${date?.getDate()}, month ${date?.getMonth() + 1 } in the history 5 years ago, 10 years ago, 15 years ago and 20 years ago`;

### BIRTHDAYS

prompt:

	list famous birthdays for tomorrow
	here's example list
    * Screenwriter and Mr Bean actor **Rowan Atkinson** turns 66
    * Arctic Monkeys frontman **Alex Turner** turns 35
    * Comedian and actor **Kate McKinnon** turns 37
    * Les Misérables and Fantastic Beasts actor **Eddie Redmayne** turns 39
    * Entrepreneur and famous son **Eric Trump** turns 37
    * Celebrity chef **Nigella Lawson** turns 61
    * TikTok star with 994k fans **Christian Hull** turns 34

```javascript
		{
			let date = new Date(text || null);
			return `list 5 celebrities who were born on day ${date?.getDate()} ,${
				date?.getMonth() + 1
			},`;
		},
		// FYI this would be tomorrow's date (we are using prep one day before needed)
		
	```	

### PHONE TOPICS
prompt

	"pretend that you're radio presenter and want to encourage people to call in, list 5 conversation topics that are observations or inspiring",
	

### PUBLIC HOLIDAYS

prompt:

	list 5 public and funny holidays for tomorrow [date] around the world, only give me the list, here's example
	* Cuddle Up Day
	* Shortbread Day
	* Bean Day
	* Apple Tree Day
	* Three Kings Day
	* Technology Day


### NEW MUSIC (web search)

prompt:

	list 5 most trending new music releases of today, only give me the list
	here's example: 
	- **Anyone** - Justin Bieber
	- **Goodbye** - Imanbek feat. Goodboys
	- **All There** - Noah Cyrus
	- **Daily Duppy Pt.2** - Digga D
	- **24 Hours x Gypsy Woman** - Clean Bandit feat. Yasmin Green & Crystal Waters
	- **Gum** - Cupcake
	- **Your Problem** - Four Of Diamonds

use URL: https://www.officialcharts.com/new-releases/

---

### WOULD YOU RATHER?

prompt:

	generate one random and creative 'would you rather' question, example: "Would you rather be able to play any instrument you pick up or learn any language you want in a matter of days?"

### GUESS THE MOVIE QUOTE

prompt: 
	give me the short quote from famous movie from past 30 years and list the answer in (brackets like this) example: "I like that boulder, that is a nice boulder." (Answer: Shrek 1)


### OUR STUDY SAYS

	give me similar funny study result like example: (only give the study, not the assistant answer)
	- According to a new study, three out of ten people don’t actually know this about their partner. What is it?
	- A) How much they weigh
	- B) How much they earn - ANSWER
	- C) How much they drink

---

### WEEKLY BOX OFFICE CHARTS  (web search)

prompt:
	list 5 most watched movies and tv shows this week, only give me the list

use sourceURL: https://www.imdb.com/chart/boxoffice/


---

### ENTERTAINMENT HEADLINES  (web search)

prompt:
	get 5 entertainment headlines from today

	example:

	- Justin Bieber Denies Rumours He Is Training To Become A Minister
	
prompt:

	get the entertainment story from headline #1

	example

	### JUSTIN BIEBER DENIES RUMOURS HE IS TRAINING TO BECOME A MINISTER

	Justin Bieber has swiftly responded to rumours and fake news that he is training to become a minister at the Hillsong Church. He was forced to deny articles that claimed an anonymous source alleged that he "wants to be a full-fledged minister next year.”

	Furious the rumours had been published by press without any reliable source, the singer labelled it "fake news" on social media. The hitmaker wrote on Instagram: "I'm not studying to be a minister or anything even close to that. Have no desire for that this is fake news."

	Bieber also went on to clarify his place of worship, adding: "And btw Hillsong is not my church... For clarity I am part of Churchome.” "Church is not a place. We are the church. We don't need a building to connect with god. God is with us wherever we are” he continued.

	His wedding to Hailey Baldwin was officiated by Judah Smith from Churchome, so it obviously holds a special place in his heart. However, the Anyone hitmaker has previously thanked Hillsong for pulling him out of his most "dark" times during his rise to fame.

use sourceURL: 
https://pagesix.com/
https://www.tmz.com/
https://www.hollywoodreporter.com/
https://www.eonline.com/news


### WEIRD NEWS  (web search)

prompt:
	get 5 weird news headlines from today

	example

	- New Study Has Found The Best Alarm Clock Sound To Use
	or NEW STUDY FINDS STAR SIGNS MOST LIKELY TO WIN THE LOTTERY

prompt:

	get the weird entertainment story from headline #1

	example

	A new study has concluded that Pisces were the luckiest people last year with more lottery wins than any other star sign on the charts.
	Data crunched by experts shows which star sign took home the most division one prizes in 2020, and it’s not looking great for Sagittarius.
	Those born between February 19 and March 20 won 11.6 per cent of top lottery prizes during the study period analyzed.
	Not far behind Pisces were Gemini players who scored 9.9 per cent of division one wins, with Virgo following closely with 8.9 per cent.
	Just after that was the Aquarius star sign, with 8.5 per cent.
	Only 6 per cent of division one winners were Sagittarians, making them the unluckiest star sign if you want to win big.
	Lott spokesperson Lauren Cooney said it would be interesting to see if these winning trends continued for the different star signs.
	“Pisces are typically considered to be generous and empathetic in nature, with a deep sense of kindness and compassion” she explained.
	“It would be interesting to know if these traits transcended with their lottery windfalls and they shared their prizes with their loved ones.”


use sourceURL: 
https://apnews.com/oddities
https://www.huffpost.com/section/weird-news


### AI FLASHBACK

prompt: 

	act as radio presenter and prepare short talk break for following:
	find out one popular song from billboard top 100, random year between 1980 and 2024 and create talk break about this song, use no more than 80 words"

	example

	this band was once so broke, they slept on sleeping bags behind the dry cleaning store, here's Poison - Unskinny Bop


### TIKTOK TRENDING

maybe needed server service ?

```javascript

// server.js
const express = require('express');
const scrapeTikTok = require('./scraper');

const app = express();
const PORT = 3001;

app.get('/api/trending', async (req, res) => {
  const videos = await scrapeTikTok();
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

```

for the frontend

```javascript

// TrendingVideos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const response = await axios.get('/api/trending');
      setVideos(response.data);
    };
    
    fetchTrendingVideos();
  }, []);

  return (
    <div>
      <h1>Trending TikTok Videos</h1>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <video src={video.url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingVideos;


```

