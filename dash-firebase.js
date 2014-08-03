// Firebase reference

var ref = new Firebase("https://dashapp.firebaseio.com/books");
// Attach an asynchronous callback to read the data at our posts reference
booksRef.on('value', function (snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log('The read failed: ' + errorObject.code);
});

var booksRef = ref.child("books");

function funct1(evt)
    {
     var title = $('#book-title').text();

     var post = $('#book-content').text();

     var date = Date();
        
     console.log('Setting '+title+' '+post+' '+date);
        
     booksref.set({Title: title, Content: post, Date: date});
     evt.preventDefault();
    }

var submit = document.getElementsByTagName('button')[0];

submit.onclick = funct1;