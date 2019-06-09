(function(){

    //Http module
    let http = require("http");

    //Configuration module
    let configure_manager = require("./configuration");

    //Console.log module
    let console_upgrader = require("./console_upgrader_async");

    //Request Handler module
    let request_handler = require("./request_handler");

    let inputConfig = process.argv[2] || "default";
    let systemConfigFile = "./application_config/"+ inputConfig +".json";

    //Fetch config file
    let config = configure_manager("itc_infotech_poc", systemConfigFile);

    //Handle Uncaught Exceptions
    let exception_manager = require("./exceptionmanager_async")(config);

    //Start Http server
    let server = http.createServer(request_handler);

    //Enable Exception Module
    exception_manager.enableExceptionHandling();
    console_upgrader(config);

    server.listen(config.port);
})();
