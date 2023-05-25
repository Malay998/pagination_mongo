function filteredResults(model) {
    return async (req, res, next) => {
        const filterBy = req.query.filter || '';
        const filterValue = req.query.filterValue || '';

        try {
            const filter = {};
            filter[filterBy] = filterValue;
            const results = await model.find(filter);

            req.filteredResults = results;
            next();
        } catch (error) {
            //console.error(error);
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = filteredResults;