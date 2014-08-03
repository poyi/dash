$(document).ready(function() {

  // Logo links to home page
  $('.logo').click(function() {
    window.location.reload();
  });


$('.button-container').hide();
  $('#startSpritz').click(function(){
    $('.button-container').fadeIn();
    $('#startSpritz').hide();
  })

  // Add book form popup
  $("#add-book-btn, #cancel-add-book").click(function(e) {
    e.preventDefault();
    $("#add-book-form").fadeToggle( "slow" );
  });

  // Firebase add new books
  var ref = new Firebase("https://dashapp.firebaseio.com");

  $("#add-book").bind("click", function() {
    var bookTitle = $("#book-title").val();
    var bookAuthor = $("#book-author").val();
    var bookUrl = $("#book-url").val();
    var bookContent = $("#book-content").val();

    var booksRef = ref.child("books");

    booksRef.push({title: bookTitle, author: bookAuthor, url: bookUrl, content: bookContent}, function(error) {
        if (error !== null) {
            alert('Unable to push comments to Firebase!');
        } else {
          console.log('data sent!');
          $(".form-input").val("");
          $("#add-book-form").fadeOut( "slow" );
        }
    });

    return false;
  });

  // Firebase display books
  var booksRef = ref.child("books");
  booksRef.on('child_added', function (snapshot) {
    var newBook = snapshot.val();
    console.log("Author: " + newBook.author);
    console.log("Title: " + newBook.title);
    console.log("Content: " + newBook.content);

    var booksContainer = $('#books-container');

    $('<div>', {class: 'book-container'})
      .html('<div class="b-label">' + newBook.title + '</div>' +
            '<div class="b-author">' + newBook.author + '</div>' +
            '<img class="b-cover" src="' + newBook.url + '"/>' +
            '<div class="b-content" style="display: none;">' +
              newBook.content +
            '</div>')
      .appendTo(booksContainer);

    // Click to read
    $(".book-container").click(function() {

      var text = $(this).children('.b-content').text();
      var title = $(this).children('.b-label').text();
      var author = $(this).children('.b-author').text();

      console.log(author);

      $("#inputText").val(text);
      $(".book-label").html(title);
      $(".book-author").html(author);

      $('.book-list').hide();
      $('#spritz-reader').fadeIn('Slow');
      $('.tagline').replaceWith('<span class="taglineBig">Back to Library</span>');
    });

    $('.loading').hide();
  });
});
