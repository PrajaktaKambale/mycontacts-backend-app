const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.statics.isThisPhoneInUse = async function (phone) {
  try {
    const contact = await this.findOne({ phone });
    if (contact) return false;
    return true;
  } catch (error) {
    console.log("duplicate phone number", error.message);
    return false;
  }
};

module.exports = mongoose.model("Contact", contactSchema);
