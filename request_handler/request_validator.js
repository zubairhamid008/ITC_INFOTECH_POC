(function () {

    let check_each_input = async (input_regexp, request_value) => {
        let input_valid = false;
        try {
            let req_str = (typeof request_value === "string") ? request_value : JSON.stringify(request_value);

            let regex = new RegExp(input_regexp);
            input_valid = regex.test(req_str);
        }catch(e){
            input_valid = false;
        }
        return input_valid;
    };

    module.exports = async (api_inputs, request_inputs) => {
        let validator_checksum = true;
        for (let obj_key in api_inputs) {
            let input_regexp = api_inputs[obj_key];
            let request_value = request_inputs[obj_key];
            let is_valid = await check_each_input(input_regexp, request_value);
            if(!is_valid) validator_checksum = false;
        }

        return (validator_checksum === true) ? false : true;
    };
})();