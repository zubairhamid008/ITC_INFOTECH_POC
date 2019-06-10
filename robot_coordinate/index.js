(function () {

    let response_obj = require("../response_handler/response_object");

    let database_handler = require("../database_handler");

    let robot_cleaner = require("../robot_cleaner");

    //fetch patch
    let get_patch = async () => {
        let db = await database_handler.getDbInstance();
        let patches = db.get("patches").value();
        return (!patches) ? 0 : patches;
    };

    //function to save coordinates
    module.exports.save_coordinates = async (request_body) => {
        let status = 200;
        let instruction_response = await robot_cleaner.execute_instructions(request_body);
        let db = await database_handler.getDbInstance();
        let final_cord = [ instruction_response.current_row, instruction_response.current_clm ];
        let cleaned_patches = instruction_response.patches_cleaned;

        request_body["final_cord"] = final_cord;
        request_body["patches_cleaned"] = cleaned_patches;
        //push data to persistent database
        db.get("coordinate").push(request_body).write();
        db.set("coords", final_cord).write();
        db.set("patches", instruction_response.patches_cleaned).write();
        return await response_obj(status, {"coords": final_cord, "patches": cleaned_patches }, "Coordinates recorded successfully");
    };

    //function to retrieve last robot coordinates
    module.exports.fetch_coordinates = async (request_body) => {
        let status = 200;
        let db = await database_handler.getDbInstance();
        let final_coord = db.get("coords");
        return await response_obj(status, {"coords": final_coord, "patches" : await get_patch()});
    };

    //List all incoming instructions
    module.exports.list_coordinates = async (request_body) => {
        let status = 200;
        let db = await database_handler.getDbInstance();
        let coord = db.get("coordinate");
        return await response_obj(status, {"coords": coord});
    };
})();