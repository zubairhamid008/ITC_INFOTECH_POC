(function(){

    module.exports = async (res, resobj) => {

        res.writeHead(resobj.status, {"Content-Type": "application/json"});
        res.write(JSON.stringify(resobj));
        res.end();
    };

})();