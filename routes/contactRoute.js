const express = require("express");

const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;

//Points to be remember

//remove this from here and add into contactController for each request

//(req, res) => {
// res.send("Get all contacts");
//json format
// res.status(200).json({ message: "Get all contacts" });
