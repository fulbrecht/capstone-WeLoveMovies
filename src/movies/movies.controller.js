const service = require("./movies.service");
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
        });}
    }

async function read(req, res, next) {
    const movieId = req.params.movieId;
    const data = await service.read(movieId);
    if (data) {
        res.json({
            data,
        })
    } else {
        next({ status: 404, message: `Movie cannot be found.` });
    }

}

async function listTheaters(req, res, next) {
    const movieId = req.params.movieId;
    const data = await service.listTheaters(movieId);
    res.json({
        data,
    })
}

async function listReviews(req, res, next) {
    const movieId = req.params.movieId;
    const data = await service.listReviews(movieId);
    res.json({
        data,
    })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
    listTheaters: asyncErrorBoundary(listTheaters),
    listReviews: asyncErrorBoundary(listReviews)
    };