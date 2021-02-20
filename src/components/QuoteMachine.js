import React from "react";
import $ from "jquery";
import styles from "./styles.css";

let quotesData;
var colors = [
  "rgb(179, 33, 30)",
  "rgb(194, 106, 17)",
  "rgb(74, 150, 36)",
 "rgb(36, 139, 150)",
  "rgb(38, 78, 148)",
  "rgb(68, 27, 122)",
  "rgb(122, 27, 41)",
  "rgb(122, 116, 27)",
  "rgb(144, 163, 144)",
  "rgb(117, 117, 47)",
  "rgb(138, 102, 101)",
  "rgb(131, 101, 138)",
]
var currentQuote= "",
    currentAuthor="";

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote(){
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}
function getQuote() {
  let randomQuote = getRandomQuote();
  
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  
  $('#tweet-quote').attr(
    'href', 
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );
  
  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });
  
  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1}, 500);
    $('#author').html(randomQuote.author);
  });
  var color = Math.floor(Math.random() * colors.length);
  $('.body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}


$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);
});

class QuoteMachine extends React.Component{

  render(){
    return(
      <div id="container">
        <div className="body">
          <div className="content">
          <h1>Get a quote to make your day better!</h1>
  <div className="quote-box">
   <div className="quote-text">
     <i className="fa fa-quote-left" style={{color:"#03d9ff"}}> </i><span id="text"></span>
   </div>
   <div className="quote-author">- <span id="author"></span>
   </div>
   <div className="buttons">
    <a className="tweet-button"
       id="tweet-quote"
       title="Tweet this quote"
       target="_blank">
      <i className="fa fa-twitter"></i>
    </a>
     <button className="button" id="new-quote">New Quote</button>
   </div>
  </div>
  </div>
  </div>
</div>
    )
  }
}

export default QuoteMachine;