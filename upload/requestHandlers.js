var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

exports.start = function start(response) {
    console.log("Function start called");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.upload = function upload(response, request) {
    console.log("Function upload called");
    //Incoming form
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
            console.log("parsing done");
            fs.renameSync(files.upload.path, "/tmp/test.jpg");
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("receive image:<br/>");
            response.write("<img src='/show' />");
            response.end();
            });
    //response.write("Just received " + 
            //querystring.parse(postData).text);
    response.end();
}

exports.show = function show(response, request) {
    console.log("Function show called");
    fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
            if(error) {
                response.writeHead(500, {"Content-Type":"text/plain"});
                response.write(error + "\n");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type":"image/jpg"});
                response.write(file, "binary");
                response.end();
            }
            });
}
