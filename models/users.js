const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

const usersSchema = new mongoose.Schema({
  //   username: {
  //     type: String,
  //     required: [true, "Username tidak ada"],
  //   },
  //   password: {
  //     type: String,
  //     required: [true, "Password tidak ada"],
  //   },
  //   nik: {
  //     type: String,
  //     required: [true, "NIK tidak ada"],
  //   },
  name: {
    type: String,
    required: [true, "Nama tidak ada"],
  },
  email: {
    type: String,
    required: [true, "Email tidak ada"],
    unique: true,
  },
});

usersSchema.plugin(passportLocalMongoose);
// usersSchema.statics.findByCredential = async function (username, password) {
//   const user = await this.findOne({ username });
//   const isMatch = await bcrypt.compareSync(password, user.password);
//   return isMatch ? user : false;
// };

// usersSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model("Users", usersSchema);
