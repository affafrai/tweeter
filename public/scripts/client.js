
// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

$(document).ready(function () {

  const tweetsData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  // wrap the xss
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (obj) {
    const htmlSafeContent = escape(obj.content.text) ;  

    // adjusting the date
    const createdDay = new Date(obj.created_at).toString().slice(4, 21);
    //tweet implementing
    const $tweet = $(`
      <article>
      <header>
        <div>
        <img src=${obj.user.avatars}>
        ${obj.user.name}
        </div>
        <div class="account-name">
            ${obj.user.handle}
        </div>
      </header>
      <h5>
      ${htmlSafeContent}    
      </h5>
      <footer>
        <div>
            <h6>${createdDay}</h6> 
        </div>
        <div>
          <i class="far fa-heart"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-flag"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  }

  const renderTweets = function (tweetsData) {
    // loops through tweets
    $('#tweets-container').empty();

    for (let tweetObj of tweetsData) {
      const tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend(tweet);
    }
  }


  $("#tweet-submit").submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();
    const $error = $("#error-msg");
    // check if the tweet is not empty or null
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $error.show();
      // alert("empty tweet");
    } else if ($("#tweet-text").val().length > 140) {
     $error.show();
      // alert("your tweet is more than 140 chars please make smaller");
      $("#tweet-submit")[0].reset();
      $(".counter").text(140).css( "color", "black" );
    } else {
      $error.hide();

      console.log("test")
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#tweet-submit").serialize()
      }).then(function () {
        $("#tweet-submit")[0].reset();
        $(".counter").text(140).css( "color", "black" );
        loadTweets();
      })
      console.log("testing form submition");
    }
  })
    
 

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then(function (result) {
    console.log(result);
    renderTweets(result);

  })
}
loadTweets();

})


