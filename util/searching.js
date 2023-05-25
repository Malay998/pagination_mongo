function searchedResults(model) {
    return async (req, res, next) => {
        const search = req.query.search || "";

        try {
            const regex = new RegExp(search, 'i');
            const results = await model.find({ $or: [{ firstname: regex }, { lastname: regex }] });
            req.searchedResults = results;
            next();
        } catch (error) {
            //console.error(error);
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = searchedResults;