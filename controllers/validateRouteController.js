exports.validateRoute = (req,res,next) => {
    let {rule: {condition, condition_value,field},data} = req.body;

    if(req.status === 404 || 400 && !rule && data) {
        return res.json({
            "message": "rule is required.",
            "status": "error",
            "data": null
        });
    } else if (req.status === 404||400 && !data && rule) {
        return res.json({
            "message": "data is required.",
            "status": "error",
            "data": null
        });
    } else if (typeof(rule) != Object && typeof(data) === Object || String || Array) {
        return res.json({
            "message": "rule should be an object.",
            "status": "error",
            "data": null
        });
    } else if (typeof(data) != Object || String || Array && typeof(rule) === Object) {
        return res.json({
            "message": "data should be an object, string or array.",
            "status": "error",
            "data": null
        });
    }
}