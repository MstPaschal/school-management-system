const UploadedDocument =
  require(
    "../models/UploadedDocument"
  );



// =========================
// UPLOAD DOCUMENT
// =========================
exports.uploadDocument =
  async (req, res) => {

    try {

      const {

        classId,

        sessionId,

        term

      } = req.body;


      if (!req.file) {

        return res.status(400).json({
          message:
            "No document uploaded"
        });

      }


      const document =
        await UploadedDocument.create({

          classId,

          sessionId,

          term,

          fileName:
            req.file.filename,

          originalName:
            req.file.originalname

        });


      res.status(201).json({

        message:
          "Document uploaded successfully",

        document

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// LOAD DOCUMENTS
// =========================
exports.loadDocuments =
  async (req, res) => {

    try {

      const {

        classId,

        sessionId,

        term

      } = req.query;


      const documents =
        await UploadedDocument.findAll({

          where: {

            classId,

            sessionId,

            term

          },

          order: [["createdAt", "DESC"]]

        });


      res.status(200).json(
        documents
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// DELETE DOCUMENT
// =========================
exports.deleteDocument =
  async (req, res) => {

    try {

      const { id } = req.params;

      const document =
        await UploadedDocument.findByPk(id);

      if (!document) {

        return res.status(404).json({
          message: "Document not found"
        });

      }

      await document.destroy();

      res.status(200).json({
        message: "Document deleted successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };