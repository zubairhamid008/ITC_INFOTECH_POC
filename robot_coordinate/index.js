(function () {

    let response_obj = require("../response_handler/response_object");

    let database_handler = require("../database_handler");

    //fetch patch
    let get_patch = async () => {
        let db = await database_handler.getDbInstance();
        let patches = db.get("patches").value();
        return (!patches) ? 0 : patches;
    };

    //update patch information
    let set_patch = async (patch_set) => {
        let db = await database_handler.getDbInstance();
        let patches = db.get("patches").value();
        let patch = (!patches) ? 0 : patches;
        let response = patch  + patch_set.length;
        return response;
    };

    //function to save coordinates
    module.exports.save_coordinates = async (request_body) => {
        let status = 200;
        let patches = (request_body.patches).length;
        let db = await database_handler.getDbInstance();

        //push data to persistent database
        db.get("coordinate").push(request_body).write();
        db.set("coords", request_body.coords).write();
        db.set("patches", await set_patch(request_body.patches)).write();
        return await response_obj(status, {"coords": request_body.coords, "patches": patches }, "Coordinates recorded successfully");
    };

    //function to retrieve coordinates
    module.exports.fetch_coordinates = async (request_body) => {
        let status = 200;
        let db = await database_handler.getDbInstance();
        let final_coord = db.get("coords");
        return await response_obj(status, {"coords": final_coord, "patches" : await get_patch()});
    };

    module.exports.list_coordinates = async (request_body) => {
        let status = 200;
        let db = await database_handler.getDbInstance();
        let coord = db.get("coordinate");
        return await response_obj(status, {"coords": coord});
    };
})();