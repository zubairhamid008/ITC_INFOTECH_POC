(function(){
    let path = require("path");

    let configFile = function configFile(moduleName, filePath){

        var file = path.resolve(filePath);
        try{
            var config = require(file);
            config = JSON.stringify(config);
            config = JSON.parse(config);
        }catch(e){
            throw new Error("Failed to load the JSON file. Please provide the correct path to the file");
            process.exit();
        }
        config.configFilePath = filePath;
        config.moduleName = moduleName;
        config.logFile = moduleName + "log.log";
        return config;

    };

    module.exports = function(moduleName, filePath) {
        return (new configFile(moduleName, filePath));
    };
})();