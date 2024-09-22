// const express = require("express");
// const router = express.Router();
// const medicalRecordsController = require("../controllers/medicalRecordsController");
// const authMiddleware = require("../middlewares/auth");

// router.get("/", authMiddleware, medicalRecordsController.getUserMedicalRecords);

// router.post(
//   "/",
//   authMiddleware,
//   (req, res, next) => {
//     if (req.user.role !== "Doctor") {
//       return res
//         .status(403)
//         .json({ message: "Only doctors can create medical records" });
//     }
//     next();
//   },
//   medicalRecordsController.createMedicalRecord
// );

// router.put(
//   "/:id",
//   authMiddleware,
//   (req, res, next) => {
//     if (req.user.role !== "Doctor") {
//       return res
//         .status(403)
//         .json({ message: "Only doctors can update medical records" });
//     }
//     next();
//   },
//   medicalRecordsController.updateMedicalRecord
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   (req, res, next) => {
//     if (req.user.role !== "Doctor") {
//       return res
//         .status(403)
//         .json({ message: "Only doctors can delete medical records" });
//     }
//     next();
//   },
//   medicalRecordsController.deleteMedicalRecord
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const medicalRecordsController = require("../controllers/medicalRecordsController");
const authMiddleware = require("../middlewares/auth");

// Get user's medical records
// router.get("/" , medicalRecordsController.getUsersWithMedicalRecords);

// Create a new medical record (only for doctors)
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can create medical records" });
    }
    next();
  },
  medicalRecordsController.createMedicalRecord
);

// Update a medical record (only for doctors)
router.put(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can update medical records" });
    }
    next();
  },
  medicalRecordsController.updateMedicalRecord
);

// Delete a medical record (only for doctors)
router.delete(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can delete medical records" });
    }
    next();
  },
  medicalRecordsController.deleteMedicalRecord
);

module.exports = router;