const dbconnection = require("../db/dbconfig");

const createNotification = async (req, res) => {
  const { userid, questionid } = req.body;
  try {
    await dbconnection.query(
      "INSERT INTO notifications (userid, questionid) VALUES (?, ?)",
      [userid, questionid]
    );
    res.status(201).json({ msg: "Notification created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getNotifications = async (req, res) => {
  const userid = req.user.userid;
  try {
    const [notifications] = await dbconnection.query(
      "SELECT notifications.notificationid, notifications.userid, notifications.questionid, questions.title, questions.description, questions.createdAt FROM notifications INNER JOIN questions ON notifications.questionid = questions.questionid WHERE notifications.userid = ? ORDER BY notifications.createdAt DESC",
      [userid]
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const { notificationid } = req.params;
  try {
    await dbconnection.query(
      "DELETE FROM notifications WHERE notificationid = ?",
      [notificationid]
    );
    res.status(201).json({ msg: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  deleteNotification,
};
