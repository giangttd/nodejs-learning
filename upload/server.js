var http = require("http");
var url = require("url");

exports.start = function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname, handle, response, request);

        //var postData = "";
        //request.setEncoding("UTF-8");
        //request.on("data", function(chunk) {
                //postData += chunk;
                //console.log("Received data chunk " + chunk);
                //});
        //request.on("end", function() {
                ////Route pathname
                //route(pathname, handle, response, postData);
                //});
        //response.writeHead(200, {"Content-Type": "text/plain"});
        //response.write(content);
        //response.end();
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
};
