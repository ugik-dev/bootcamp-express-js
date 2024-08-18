const People = require("../models/peoples");
const Events = require("../models/events");

module.exports.get = async (req, res) => {
  const people = await People.findById(req.params.people_id).populate("events");
  res.send(people.events);
};

module.exports.delete = async (req, res) => {
  const { people_id, event_id } = req.params;
  const event = await Events.findOneAndDelete({
    _id: event_id,
    people: people_id,
  });
  const people = await People.findByIdAndUpdate(people_id, {
    $pull: { events: event_id },
  });
  res.send({ message: "Data berhasil dihapus", event });
};

module.exports.store = async (req, res) => {
  const { people_id } = req.params;
  const people = await People.findById(people_id);
  const event = new Events(req.body);
  people.events.push(event);
  event.people = people;
  await people.save();
  await event.save();
  res.send({ message: "add success id:" + event._id });
};

module.exports.update = async (req, res) => {
  const { people_id, event_id } = req.params;
  await Events.findOneAndUpdate(
    {
      _id: event_id,
      people: people_id,
    },
    req.body,
    {
      runValidators: true,
    }
  );
  res.send({ message: "Data berhasil diupdate" });
};
