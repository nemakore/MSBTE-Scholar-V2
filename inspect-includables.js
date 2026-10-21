const fs = require('fs');
const content = fs.readFileSync('msbtescholar-theme.backup.xml', 'utf8');

const widgetBlog = content.match(/<b:widget[^>]*type='Blog'[\s\S]*?<\/b:widget>/);
if (widgetBlog) {
  const code = widgetBlog[0];
  const list = ['main', 'comments', 'commentForm', 'threadedComments', 'threadedCommentForm', 'commentList', 'commentItem'];
  list.forEach(id => {
    const startIdx = code.indexOf("<b:includable id='" + id + "'");
    if (startIdx !== -1) {
      console.log('Found:', id, 'at', startIdx);
    } else {
      console.log('Not found:', id);
    }
  });
}
