function getUsersWithPagination(model) {
    return async (req, res, next) => {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || 'firstname';
        const sortOrder = parseInt(req.query.sortOrder) || 1;
        const filterBy = req.query.filterBy ? req.query.filterBy.split(',') : [];
        const filterValue = req.query.filterValue || '';

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {
          };

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
            page: page + 1,
            limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
            page: page - 1,
            limit: limit
            }
        }
  
        // Add search functionality
        const regex = new RegExp(search, 'i');
        const searchQuery = { $or: [{ firstname: regex }, { lastname: regex }] };
        
        // Add filtering functionality
        const filter = {};
        if (filterBy.length > 1 && filterValue) {
            const filterConditions = filterBy.map(field => {
                return { [field]: { $regex: new RegExp(filterValue, 'i') } };
            });
            filter.$or = filterConditions;
        }
        else if (filterBy && filterValue) {
            filter[filterBy] = isNaN(Number(filterValue)) ? filterValue : Number(filterValue);
        }

        // Add sorting functionality
        const sort = {};
        if (sortBy){
        sort[sortBy] = sortOrder;
        }

        try {
        // results.results = await model.find(searchQuery).sort(sort).find(filter).limit(limit).skip(startIndex).exec();
        
        console.log("filter object: ", filter);
        console.log("filterValue:", filterValue);

        results.results = await model
        .find({ ...searchQuery, ...filter })
        .sort(sort)
        .limit(limit)
        .skip(startIndex)
        .exec();

        // console.log("results: ", results);
        req.paginatedResults = results;
        next();
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
}
  
  module.exports = getUsersWithPagination;