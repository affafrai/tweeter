$(document).ready(function() {
  console.log("dom has loaded");
  // $('#tweet-text').on("input", function(){
  //   var maxlength = $(this).attr("maxlength");
  //   var currentLength = $(this).val().length;

  //   if( currentLength >= maxlength ){
  //     $( this ).parent().children("div").children(".counter").css("color","red")

  //       console.log("You have reached the maximum number of characters.");
  //   }else{
  //     let charLeft = maxlength - currentLength;
  //     console.log(charLeft + " chars left");
  //     $( this ).parent().children("div").children(".counter").val(charLeft)
  //   // $(this).parent().children('div');
  //   // .css( "background-color", "red" )
  //   }
  // });

  $('#tweet-text').on("input", function(){
    const input = $(this).val().length;
    let max = 140;
    let charsLeft = max - input;
    $(".counter").text(charsLeft);
    if (charsLeft < 0) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red");
    }
  });
});

// $('#tweet-text').keyup(function () {
//   var max = 500;
//   var len = $(this).val().length;
//   if (len >= max) {
//     $('#charNum').text(' you have reached the limit');
//   } else {
//     var char = max - len;
//     $('#charNum').text(char + ' characters left');
//   }
// });

