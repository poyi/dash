var ref = new Firebase("https://dashapp.firebaseio.com/books");

var booksRef = ref.child("books");

$("#add-book").bind("click", function() {
    var titleRaw = $("#book-title");
    var authorRaw = $("#book-author");
    var contentRaw = $("#book-content");
    var bookTitle = $.trim(titleRaw.val());
    var bookAuthor = $.trim(authorRaw.val());
    var bookContent = $.trim(contentRaw.val());
 
    if (bookTitle.length === 0) {
        alert('contents are required to continue!');
        } else {
        _fireBaseRef.push({title: bookTitle, author: bookAuthor, content: bookContent}, function(error) {
            if (error !== null) {
                alert('Unable to push comments to Firebase!');
            }
        });
 
        titleRaw.val("");
        authorRaw.val("");
        contentRaw.val("");
    }
 
    return false;
});