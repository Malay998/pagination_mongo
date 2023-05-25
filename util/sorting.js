function sortedResults(model) {
    return async (req, res, next) => {
        const sortBy = req.query.sortBy || 'firstname';
        const sortOrder = parseInt(req.query.sortOrder) || 1;

        try {
            const sort = {};
            sort[sortBy] = sortOrder;
            const results = await model.find().sort(sort);

            req.sortedResults = results;
            next();
        } catch (error) {
            //console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = sortedResults;