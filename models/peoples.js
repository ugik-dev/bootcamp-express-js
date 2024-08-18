const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Events = require("./events");
const Users = require("./users");

const peoplesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: String,
  parent_name: String,
  image: String,
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],

  //   geometry: {
  //     type: {
  //       type: String,
  //       enum: ["Point"],
  //       required: true,
  //     },
  //     coordinates: {
  //       type: [Number],
  //       required: true,
  //     },
  //   },
  //   author: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   reviews: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Review",
  //     },
  //   ],
});

peoplesSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Events.deleteMany({ _id: { $in: doc.events } });
  }
});

peoplesSchema.virtual("age").get(function () {
  const birthDate = new Date(this.dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  } else if (months === 0 && today.getDate() < birthDate.getDate()) {
    years--;
    months = 11;
  }

  return `${years} Tahun ${months} Bulan`;
});

module.exports = mongoose.model("People", peoplesSchema);
