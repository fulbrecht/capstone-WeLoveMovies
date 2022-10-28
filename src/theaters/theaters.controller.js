const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const isShowing = req.query.is_showing

    if (isShowing === "true") {
        const data = await service.listShowing();
        res.json({
            data,
        })
    } else  {  
        const data = await service.list();
        res.json({
            data,
        });
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    };