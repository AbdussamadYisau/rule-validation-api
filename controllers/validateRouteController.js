const isArray = require('lodash/isArray');

exports.requiredRoute = (req,res,next) => {
    let {rule,data} = req.body;
    
    const isAnObject = (field) => {
        if (typeof field === 'object' && !isArray(field)) {
          return true;
        } else {
          return false;
        }
    };

    if(!rule && !data) {
        return res.json({
            "message": "rule and data is required.",
            "status": "error",
            "data": null
        });
    } else if(!rule && data) {
        return res.json({
            "message": "rule is required.",
            "status": "error",
            "data": null
        });
    } else if (!data && rule) {
        return res.json({
            "message": "data is required.",
            "status": "error",
            "data": null
        });
    }  else {
        next();
    }
    
};

exports.isRuleValid = (req,res,next) => {
    const {rule} = req.body;

    if(typeof rule === 'object') {
        next();
    } else {
        return res.status(400).json({
            message: 'rule should be an object.',
            status: 'error',
            data: null
        });        
    }
};

exports.isDataValid = (req,res,next) => {
    const {data} = req.body;

    if((typeof data === 'object' || 'string')  && isArray(data)) {
       next();
    } else {
        return res.status(400).json({
            message: 'Invalid JSON payload passed.',
            status: 'error',
            data: null 
        });
    }
};