(function (){

    let north_direction = async (direction_obj) => {
        let updated_value = direction_obj.current_clm;
        if(direction_obj.current_clm < direction_obj.room_clm) updated_value = updated_value + 1;
        direction_obj.current_clm = updated_value;
        return direction_obj;
    };

    let south_direction = async (direction_obj) => {
        let updated_value = direction_obj.current_clm;
        if(direction_obj.current_clm > 0) updated_value = updated_value - 1;
        direction_obj.current_clm = updated_value;
        return direction_obj;
    };

    let east_direction = async (direction_obj) => {
        let updated_value = direction_obj.current_row;
        if(direction_obj.current_row < direction_obj.room_row) updated_value = updated_value + 1;
        direction_obj.current_row = updated_value;
        return direction_obj;
    };

    let west_direction = async (direction_obj) => {
        let updated_value = direction_obj.current_row;
        if(direction_obj.current_row > 0) updated_value = updated_value - 1;
        direction_obj.current_row = updated_value;
        return direction_obj;
    };

    let spot_cleaned = async (direction_obj) => {
        let patches_cleaned = direction_obj.patches_cleaned;
        let patch = direction_obj.patches;
        let new_patch = direction_obj.patches;
        let patch_found = false;
        new_patch = [];
        for( let i = 0; i < patch.length; i++){
            let spt = patch[i];

            if(!patch_found) {
                let spt_row = spt[0];
                let spt_clm = spt[1];
                if (spt_row === direction_obj.current_row && spt_clm === direction_obj.current_clm) {
                    patches_cleaned = patches_cleaned + 1;
                    patch_found = true;
                }else{
                    new_patch.push(spt);
                }
            }else{
                new_patch.push(spt);
            }
        }

        direction_obj.patches = new_patch;
        return patches_cleaned;
    };


    //Direction Binding to function
    let directions_config = {
        "N" : north_direction,
        "S" : south_direction,
        "E" : east_direction,
        "W" : west_direction,
    };

    //Execute Incoming Instructions
    module.exports.execute_instructions= async (coordinate_json) => {
        let direction_obj = {
            "room_row"          :coordinate_json.roomSize[0],
            "room_clm"          :coordinate_json.roomSize[1],
            "current_row"       :coordinate_json.coords[0],
            "current_clm"       :coordinate_json.coords[1],
            "patches_cleaned"   : 0,
            "patches"           : coordinate_json.patches
        };

        let ins = coordinate_json.instructions;
        let ins_len = ins.length;
        direction_obj.patches_cleaned = await spot_cleaned(direction_obj);
        for(let i = 0; i < ins_len; i++){
            let dir = ins[i];
            let method = directions_config[dir];
            if(typeof method !== "undefined"){
                direction_obj = await method(direction_obj);
                direction_obj.patches_cleaned = await spot_cleaned(direction_obj);
            }
        }
        return direction_obj;
    };
})();