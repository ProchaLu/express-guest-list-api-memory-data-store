import express from 'express';

const app = express();

app.use(express.json());

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

let id = 1;

const guestList: Guest[] = [];

// Enable CORS
app.use(function allowCrossDomainRequests(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Get endpoints
app.get('/', function rootHandler(req, res) {
  res.json({
    guests: `${req.protocol}://${req.get('host')}/guests/`,
  });
});

// Get all guests
app.get('/guests', function getGuestsHandler(req, res) {
  res.json(guestList);
});

// New guest
app.post('/guests', function postGuestsHandler(req, res) {
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).json({
      errors: [
        { message: 'Request body missing a firstName or lastName property' },
      ],
    });
    return;
  }

  if (Object.keys(req.body).length > 3) {
    res.status(400).json({
      errors: [
        {
          message:
            'Request body contains more than firstName, lastName and deadline properties',
        },
      ],
    });
    return;
  }

  const guest = {
    id: String(id++),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    ...(req.body.deadline ? { deadline: req.body.deadline } : {}),
    attending: false,
  };

  guestList.push(guest);

  res.json(guest);
});

// Get a single guest
app.get('/guests/:id', function getGuestHandler(req, res) {
  const guest = guestList.find(
    (currentGuest) => currentGuest.id === req.params.id,
  );

  if (!guest) {
    res
      .status(404)
      .json({ errors: [{ message: `Guest ${req.params.id} not found` }] });
    return;
  }
  res.json(guest);
});

// Modify a single guest
app.put('/guests/:id', function putGuestHandler(req, res) {
  const allowedKeys = ['firstName', 'lastName', 'deadline', 'attending'];
  const difference = Object.keys(req.body).filter(
    (key) => !allowedKeys.includes(key),
  );

  if (difference.length > 0) {
    res.status(400).json({
      errors: [
        {
          message: `Request body contains more than allowed properties (${allowedKeys.join(
            ', ',
          )}). The request also contains these extra keys that are not allowed: ${difference.join(
            ', ',
          )}`,
        },
      ],
    });
    return;
  }

  const guest = guestList.find(
    (currentGuest) => currentGuest.id === req.params.id,
  );

  if (!guest) {
    res
      .status(404)
      .json({ errors: [{ message: `Guest ${req.params.id} not found` }] });
    return;
  }

  if (req.body.firstName) guest.firstName = req.body.firstName;
  if (req.body.lastName) guest.lastName = req.body.lastName;
  if (req.body.deadline) guest.deadline = req.body.deadline;
  if ('attending' in req.body) guest.attending = req.body.attending;
  res.json(guest);
});

// Delete a single guest
app.delete('/guests/:id', function deleteGuestHandler(req, res) {
  const guest = guestList.find(
    (currentGuest) => currentGuest.id === req.params.id,
  );

  if (!guest) {
    res
      .status(404)
      .json({ errors: [{ message: `Guest ${req.params.id} not found` }] });
    return;
  }

  guestList.splice(guestList.indexOf(guest), 1);
  res.json(guest);
});

app.listen(process.env.PORT || 4000, () => {
  console.log('🚀 Guest list server started on http://localhost:4000');
});
