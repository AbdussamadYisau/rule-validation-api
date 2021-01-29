exports.getBase = (req,res,next) => {
    if((req.status === 200||201, req.statusText === 'OK')) {
        return res.json({
            "message": "My Rule-Validation API",
            "status": "success",
            "data": {
                "name": "Yisau Abdussamad",
                "github": "@AbdussamadYisau",
                "email": "sammieyisau@gmail.com",
                "mobile": "08123884098",
                "twitter": "@sammieyisau_"
            }
        });
    } else {
        return res.status(404 || 501).json({
            "status" : "error",
            "message" : "Unable to communicate with database"
        });
    }
}