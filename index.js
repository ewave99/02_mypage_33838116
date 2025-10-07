var http = require("http");
const port = 8000;

const template = `
<!DOCTYPE html>
<html>
    <head lang='en'>
        <meta charset='utf-8'>
        <title>My Page!</title>
    </head>
    <body>
        <h1>My Page!</h1>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
        <p><strong>User agent:</strong> {useragent}</p>
    </body>
</html>
`;

http.createServer(function(req, res) {
    let heading, paragraph, content;

    console.log(req.url);

    if (req.url === "/hello") {
        heading = "Hello everybody!";
        paragraph = "this is a really nice hello";
    }
    else {
        heading = "My page";
        paragraph = "My name is E H Murdoch.";
    }

    /** This is where we replace our placeholders with text. */
    content = template.replace("{heading}", heading);
    content = content.replace("{paragraph}", paragraph);
    content = content.replace("{useragent}", req.rawHeaders[3]);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
}).listen(port, function() {
    console.log(`Node server is listening on port ${port}...`)
});