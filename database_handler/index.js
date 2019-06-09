(function () {
    const low = require("lowdb");
    const FileSync = require("lowdb/adapters/FileSync");

    let adapter = new FileSync("itc_infotech.json");
    let db = low(adapter);

    db.defaults({
        coordinate: []
    }).write();

    module.exports.getDbInstance = async () => {
        return db;
    }
})();