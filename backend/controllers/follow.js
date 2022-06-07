const connection = require("../models/db");

const addFollow = (req, res) => {
  const person_id = req.params.id;
  const user_id = req.token.userId;

  const query = `INSERT INTO follow (person_id,user_id) VALUES (? ,?)`;
  const data = [person_id, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: "No followers",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};
// git user info
const getProfile = (req, res) => {
  const userId = req.token.userId;
  const query = `SELECT * FROM users WHERE id = ? AND is_deleted=0`;
  const data = [userId];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: result,
    });
  });
};

// git user info
const getProfileUser = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ? AND is_deleted=0`;
  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: result,
    });
  });
};
// update user info

const updateUser = (req, res) => {
  const userId = req.token.userId;
  const { firstName, lastName, ProfilePicture } = req.body;

  const query = `SELECT * FROM users WHERE id=?`;
  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const query = `UPDATE users SET firstName=? , lastName =? ,ProfilePicture =? WHERE id=? `;
    const data = [
      firstName || result[0].firstName,
      lastName || result[0].lastName,
      ProfilePicture || result[0].ProfilePicture,
      userId,
    ];

    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
          err,
        });
      }
      res.status(201).json({
        success: true,
        message: "user Updated",
        user: result,
      });
    });
  });
};

module.exports = { addFollow, getProfile, getProfileUser, updateUser };
