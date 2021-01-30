exports.getBase = (req,res,next) => {
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
    
}