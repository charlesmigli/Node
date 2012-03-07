var http = require('http');

http.ServerResponse.prototype.respond = function (content, status){
    //There is no response code
    if('undefined' == typeof status){
        if('number' == typeof content || !isNaN(parseInt(content))){
            status = parseInt(content);
            content = undefined;
        }else{
            status = 200;
        }
    }
    //There is a response code
    //
    //Response is not ok => We format a content error message
    if(status != 200){
        content = {
            "code": status,
            "status": http.STATUS_CODES[status],
            "message": content && content.toString() || null
        };
    }
    // Status is ok. We test if content is Json or just a string/value
    if('objet' != typeof content){
        content = {"result":content};
    }
    // 
    this.send(JSON.stringify(content) + "\n", status);
};
