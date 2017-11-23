//promise
//then的链式

getJSON('/post/1.json').then(post => getJSON(post.commentURL)).then(comments => console.log('resolved:', comments), err => console.log('rejected:', err));