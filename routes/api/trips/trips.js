const { User } = require("../../../models/user");
const { Trip } = require("../../../models/trip");

const createTrip = (req, res, next) => {
  const driverId = req.user.id;
  User.findById(driverId).then(driver => {
    if (!driver) return Promise.reject({ errors: "Driver not exit !" });

    const newTrip = new Trip({
      driverId,
      ...req.body
    });
    return newTrip.save();
  });
};

const bookTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const devopsId = req.user._id;

  const devops = await User.findById(devopsId);
  const trip = await User.findById(tripId);

  if (!devops) return res.status(404).json({ erros: "Devops Not found" });
  if (!trip) return res.status(404).json({ erros: "Trip Not found" });

  trip.passengerIds.push(devopsId);
  return await trip.save();
};

module.exports = { createTrip, bookTrip };
