module.exports = [
    {
    "method": "POST",
    "api": "/robot/coordinate/create",
    "handler": "save_coordinates"
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

