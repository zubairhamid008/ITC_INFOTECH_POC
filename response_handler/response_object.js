(function(){

    module.exports = async (status, resobj, mesg) => {
        let msg = (typeof mesg != "string") ? "Continue ahead" : mesg;
        return {
            "status": status,
            "response":{
                "responseData": resobj,
                "message": msg
            }
        };
    };
})();