const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@description Get all contacts
//@route GET/api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  //  res.status(200).json({ message: "Get all contacts" });
  res.status(200).json(contacts);
});

//@desc create a new  contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  const isNewUser = await Contact.isThisPhoneInUse({ phone });
  if (!isNewUser)
    return Contact.json({
      success: false,
      message: "Duplicate phone numbers are not allowed",
    });
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//@desc  get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount!");
  } else res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount!");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount!");
  }

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
