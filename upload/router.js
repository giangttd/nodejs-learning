exports.route = function route(pathname, handle, response, request) {
    console.log("Route request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("4040 Not found");
    }
};

