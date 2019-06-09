module.exports = [
    {
        "method": "POST",
        "api": "/robot/coordinate/create",
        "handler": "save_coordinates",
        "api_inputs": {
            "roomSize" : /^\[[0-5],[0-5]\]$/,
            "coords" : /^\[[0-5],[0-5]\]$/,
            "patches" : /^\[((\[[0-5],[0-5]\],)+)\[[0-5],[0-5]\]\]$/,
            "instructions" : /^[NSEW]+$/
        }
    },
    {
        "method": "GET",
        "api": "/robot/coordinate/fetch",
        "handler": "fetch_coordinates"
    },
    {
        "method": "GET",
        "api": "/robot/coordinate/list",
        "handler": "list_coordinates"
    }
];

