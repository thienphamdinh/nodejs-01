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
    const savedTrip = newTrip.save();
    res.status(200).json(savedTrip);
  });
};

const bookTrip = async (req, res, next) => {
  const { tripId } = req.params;

  const { numberOfBookingSeat } = req.body;

  const passengerIds = req.user.id;

  const passenger = await User.findById(passengerIds);

  const trip = await Trip.findById(tripId);

  if (!passenger) return res.status(404).json({ erros: "Passenger Not found" });
  if (!trip) return res.status(404).json({ erros: "Trip Not found" });
  if (numberOfBookingSeat > trip.availableSeats)
    return res.status(400).json({ errors: "your book is over" });

  trip.availableSeats = trip.availableSeats - numberOfBookingSeat;
  trip.passengerIds.push(passengerIds);
  const savedTrip = await trip.save();
  res.status(200).json(savedTrip);
};

module.exports = { createTrip, bookTrip };
