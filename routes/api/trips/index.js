const express = require("express");
const router = express.Router();

const tripController = require("./trips");
const { authenticating, authorizing } = require("../../../middlewear/auth");

router.post("/create-trip",authenticating,authorizing(["driver"]),tripController.createTrip);

router.post("/book-trip/:tripId",authenticating,authorizing(["devops"]),tripController.bookTrip);


module.exports = router;
