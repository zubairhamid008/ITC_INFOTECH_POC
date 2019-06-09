(function () {

    let response_handler = require("../response_handler");

    let response_obj = require("../response_handler/response_object");

    let api_routes = require("./request_config");

    let _find = require("lodash.find");

    let process_request = async (request_body, api_extension) => {

        let request_body_json = {};
        if(api_extension.method === "POST") {
            try{
                request_body_json = JSON.parse(request_body);
            }catch(e){
                console.log(e);
                return await response_obj(400, {"endpoint": "Incorrect Request"}, "Incorrect request");
            }
        }

        let methodName = api_extension.handler;
        let module = require("../robot_coordinate");
        return await module[methodName](request_body_json);
    };

    module.exports = async (req, res) => {

        let request_body = "";

        req.on("data", (chunk) => {
            request_body += chunk;
        });
        let resObj = await response_obj(404, {"endpoint": "Not Found"}, "Endpoint Not Found");

        let api_extension = _find(api_routes,{"method": req.method, "api": req.url});
        if(api_extension) resObj = await process_request(request_body, api_extension);
        response_handler(res, resObj);
    };
})();