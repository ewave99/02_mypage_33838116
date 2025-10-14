var http = require("http");
const port = 8000;

const template = `
<!DOCTYPE html>
<html>
    <head lang='en'>
        <meta charset='utf-8'>
        <title>{pagetitle} - My Page!</title>
    </head>
    <body>
        <h1>My Page!</h1>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
        <p><strong>User agent:</strong> {useragent}</p>
    </body>
</html>
`;

const data = {
    "/": ["Homepage", "My name is E H Murdoch"],
    "/hello": ["Hello Everybody!", "This is a really nice hello"],
    "/fact": ["A fun fact", "Pirates wear eyepatches so one eye will always be able to see in the dark."]
};

http.createServer(function(req, res) {
    let pagetitle, heading, paragraph, content;

    console.log(req.url);

    if (req.url in data) {
        [heading, paragraph] = data[req.url];
    }
    else {
        [heading, paragraph] = data["/"];
    }

    pagetitle = heading;

    /** This is where we replace our placeholders with text. */
    content = template.replace("{pagetitle}", pagetitle)
        .replace("{heading}", heading)
        .replace("{paragraph}", paragraph)
        .replace("{useragent}", req.rawHeaders[3]);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
}).listen(port, function() {
    console.log(`Node server is listening on port ${port}...`)
});