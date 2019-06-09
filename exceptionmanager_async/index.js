(function(){
    
    let unExpectedException = function(config){
        this.config = config;
        this.started = false;
    };

    unExpectedException.prototype = {
        enableExceptionHandling: function(){
            let resHandle = this.writeUnCaughtException.bind(this);
            process.on("uncaughtException", resHandle);
            process.on("error", resHandle);
            this.appStarted();
        },
        writeUnCaughtException: function(err){
            let error = err.stack;
            console.log(error);
        },
        appStarted: function(){
            if(!this.started) console.log( this.config.application_server_message + this.config.port);
            this.started = true;
        }
    };

    module.exports = function(config, tnxId){
        return (new unExpectedException(config, tnxId));
    };
})();