
var commentsWrapper = $('#messages');

$.get('/comments')
    .then(function(comments) {
        console.log(comments);
        for (var i = comments.length - 1; i > 0; i--) {
            commentsWrapper.append('<li>' + comments[i] + '</li>');
        }
    })
    .fail(function(error) {
        console.error('Error fetching comments: ' + error);
    });
