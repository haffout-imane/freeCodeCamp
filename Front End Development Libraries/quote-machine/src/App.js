import './App.css';
import { useState } from 'react';

const quotes = [
  {
    text: "\"The only way to do great work is to love what you do\"",
    author: "Steve Jobs"
  },
  {
    text: "\"Life is what happens to you while you're busy making other plans\"",
    author: "John Lennon"
  },
  {
    text: "\"The future belongs to those who believe in the beauty of their dreams\"",
    author: "Eleanor Roosevelt"
  },
  {
    text: "\"It is during our darkest moments that we must focus to see the light\"",
    author: "Aristotle"
  },
  {
    text: "\"The only impossible journey is the one you never begin\"",
    author: "Tony Robbins"
  },
  {
    text: "\"In the end, we will remember not the words of our enemies, but the silence of our friends\"",
    author: "Martin Luther King Jr."
  },
  {
    text: "\"Be yourself; everyone else is already taken\"",
    author: "Oscar Wilde"
  },
  {
    text: "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe\"",
    author: "Albert Einstein"
  },
  {
    text: "\"You miss 100% of the shots you don't take\"",
    author: "Wayne Gretzky"
  },
  {
    text: "\"Whether you think you can or you think you can't, you're right\"",
    author: "Henry Ford"
  },
  {
    text: "\"I have not failed. I've just found 10,000 ways that won't work\"",
    author: "Thomas A. Edison"
  },
  {
    text: "\"A room without books is like a body without a soul\"",
    author: "Marcus Tullius Cicero"
  },
  {
    text: "\"The only thing we have to fear is fear itself\"",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "\"Success is not final, failure is not fatal: it is the courage to continue that counts\"",
    author: "Winston Churchill"
  },
  {
    text: "\"The best time to plant a tree was 20 years ago. The second best time is now\"",
    author: "Chinese Proverb"
  }
];

const colors = [
	"#2C3E50", "#34495E", "#1ABC9C", "#16A085", 
	"#8E44AD", "#9B59B6", "#2980B9", "#3498DB", 
	"#E74C3C", "#C0392B", "#F39C12", "#D35400", 
	"#27AE60", "#2ECC71", "#7F8C8D", "#95A5A6"
]

function App()
{
	const [index, setIndex] = useState(0);
	const [color, setColor] = useState(colors[0]);

	function nextQuote() {
		setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
		const newColor = colors[index];
		setColor(newColor);
	}



	return(
		<div className="App" style={{ backgroundColor: color, color: color }}>
			<div id="quote-box">
				<p id="text">{quotes[index].text}</p>
				<p id="author">{quotes[index].author}</p>
				<div className="buttons">
					<a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quotes[index].text + " - " + quotes[index].author
)}`}
						target="_blank"
						rel="noopener noreferrer"
						style={{ backgroundColor: color, color: "white"}}
					>
						Tweet Quote
					</a>
					<button
						id="new-quote"
						onClick={nextQuote}
						style={{ backgroundColor: color, color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}
					>
						New Quote
					</button>
				</div>
			</div>
		</div>
	)
}

export default App;
