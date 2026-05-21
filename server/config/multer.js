const multer = require("multer");

const path = require("path");



// STORAGE
const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/"
        );

      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        const uniqueName =

          Date.now() +

          "-" +

          Math.round(
            Math.random() * 1E9
          ) +

          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );

      }

  });



// FILE FILTER
const fileFilter =
  (req, file, cb) => {

    const allowedTypes = [

      ".jpg",

      ".jpeg",

      ".png",

      ".pdf",

      ".doc",

      ".docx"

    ];


    const ext =
      path.extname(
        file.originalname
      ).toLowerCase();


    if (
      allowedTypes.includes(ext)
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Invalid file type"
        ),
        false
      );

    }

  };



const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024

  }

});

module.exports = upload;