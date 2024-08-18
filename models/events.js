const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const People = require("./peoples");

const eventsSchema = new Schema({
  indikasi: {
    type: String,
    enum: ["imunisasi", "stunting", "normal"],
  },
  time: {
    type: Date,
    required: true,
  },
  location: String,
  bidan: String,
  note: String,
  people: {
    type: Schema.Types.ObjectId,
    ref: "Peoples",
  },
});

// peoplesSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await Events.deleteMany({ _id: { $in: doc.events } });
//   }
// });

// eventsSchema.post("findOneAndDelete", async function (doc) {
//   const docToDelete = await this.model.findOne(this.getQuery());
//   console.log("dc", doc);
//   // console.log(docToDelete.people._id);
//   // if (next) {
//   //   console.log("ini pre", docToDelete.people);
//   //   const peopleC = await People.findOne({ _id: "66abaf8afafcb456ccc9061f" });
//   //   console.log("ptr3", peopleC);
//   //   await People.findByIdAndUpdate(docToDelete.people._id, {
//   //     $pull: { events: docToDelete._id },
//   //   });
//   // }
//   next(err);
//   // next(err);
// });

module.exports = mongoose.model("Events", eventsSchema);
