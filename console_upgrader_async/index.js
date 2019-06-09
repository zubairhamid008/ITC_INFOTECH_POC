let mainConsole = console.log.bind(console);

module.exports = async (config) => {

    ctx = (typeof ctx == "object") ? ctx : {};
    let tnxId = (typeof ctx.tnxId == "string" && ctx.tnxId != "") ? ctx.tnxId : "";

    console.log = function(message){
        let tags = "";
        try {
            let jsonMessage = JSON.parse(message);
            if(typeof jsonMessage["tnxId"] != "string") jsonMessage["tnxId"] = tnxId;
            tags = jsonMessage.tag || "";
            message = JSON.stringify(jsonMessage);
        } catch(e) {
            message = tnxId + " " + message;
            tags = "directConsole"
        }

        if(config.disable_logs) return true;
        mainConsole.apply(console, arguments);
    };
};