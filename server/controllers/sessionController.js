const Session = require("../models/Session");


// CREATE SESSION
exports.createSession = async (req, res) => {

  try {

    const { sessionName } = req.body;

    const existingSession = await Session.findOne({
      where: { sessionName }
    });

    if (existingSession) {

      return res.status(400).json({
        message: "Session already exists"
      });

    }

    const newSession = await Session.create({
      sessionName
    });

    res.status(201).json({
      message: "Session created successfully",
      newSession
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET SESSIONS
exports.getSessions = async (req, res) => {

  try {

    const sessions = await Session.findAll({
      order: [["sessionName", "DESC"]]
    });

    res.status(200).json(sessions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// DELETE SESSION
exports.deleteSession = async (req, res) => {

  try {

    const { id } = req.params;

    const foundSession = await Session.findByPk(id);

    if (!foundSession) {

      return res.status(404).json({
        message: "Session not found"
      });

    }

    await foundSession.destroy();

    res.status(200).json({
      message: "Session deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};