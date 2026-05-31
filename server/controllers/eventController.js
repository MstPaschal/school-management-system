const Event =
  require("../models/Event");


// ==========================
// CREATE EVENT
// ==========================
exports.createEvent =
  async (req, res) => {

    try {

      const images =
        req.files?.map(
          (file) =>
            `/uploads/events/${file.filename}`
        ) || [];

      const event =
        await Event.create({

          title:
            req.body.title,

          summary:
            req.body.summary,

          content:
            req.body.content,

          images

        });

      res.status(201).json({

        message:
          "Event created successfully",

        event

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message
      });

    }

  };


// ==========================
// GET ALL EVENTS
// ==========================
exports.getEvents =
  async (req, res) => {

    try {

      const events =
        await Event.findAll({

          order: [
            ["createdAt", "DESC"]
          ]

        });

      res.json(events);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };


// ==========================
// GET SINGLE EVENT
// ==========================
exports.getSingleEvent =
  async (req, res) => {

    try {

      const event =
        await Event.findByPk(
          req.params.id
        );

      if (!event) {

        return res.status(404).json({

          message:
            "Event not found"

        });

      }

      res.json(event);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// ==========================
// DELETE EVENT
// ==========================
exports.deleteEvent =
  async (req, res) => {

    try {

      const event =
        await Event.findByPk(
          req.params.id
        );

      if (!event) {

        return res.status(404).json({

          message:
            "Event not found"

        });

      }

      await event.destroy();

      res.json({

        message:
          "Event deleted successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };