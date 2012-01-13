var http = require('http');

http.ServerResponse.prototype.respond = function (content, status){
    if('undefined' == typeof status){
        if('number' == typeof content || !isNaN(parseInt(content))){
            status = parseInt(content);
            content = undefined;
        }else{
            status = 200;
        }
    }
    if(status != 200){
        content = {
            "code": status,
            "status": http.STATUS_CODES[status],
            "message": content && content.toString() || null
        };
    }
    if('objet' != typeof content){
        content = {"result":content};
    }

    this.send(JSON.stringify(content) + "\n", status);
};
