const User = require('../model/user');
const getUsersWithPagination = require('../util/pagination');
// const searchedResults = require('../util/searching');
// const sortedResults = require('../util/sorting');
// const filteredResults = require('../util/filtering');

const getUsers = getUsersWithPagination(User);
// const searchUsers = searchedResults(User);
// const sortUsers = sortedResults(User);
// const filterUsers = filteredResults(User);

const getAllUsers = async (req, res) => {
  try {
    const users = req.paginatedResults.results || [];
    res.status(200).json({
      status: 'success',
      results: req.paginatedResults.results.length,
      next: req.paginatedResults.next,
      previous: req.paginatedResults.previous,
      data: {
        users
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports = {
  getAllUsers,
  getUsers
};