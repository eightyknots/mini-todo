const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const router = express.Router();

const MONGO_URL = 'mongodb://localhost:27017';
const MONGO_DBNAME = 'todos';
const MONGO_COLLECTION = 'todos';

router.use(express.json());

router.get('/', asyncHandler(async (req, res, next) => {
  let result = [];
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DBNAME);
    const dbResult = await db.collection(MONGO_COLLECTION).find({ isDeleted: false }).toArray();
    result = dbResult.map((todo) => ({
      id: todo._id,
      description: todo.description,
      date: new Date(todo.dateAdded).toISOString(),
      isComplete: todo.dateCompleted !== null 
    }));
  } catch (e) {
    next(e);
  }
  res.json(result);
}));

router.post('/', asyncHandler(async (req, res, next) => {
  const body = req.body;
  let newObject = {};

  if (typeof body.description === 'string' && body.description.length > 0) {
    try {
      const client = await MongoClient.connect(MONGO_URL);
      const db = client.db(MONGO_DBNAME);
      const document = {
        _id: uuid.v4(),
        description: body.description,
        dateAdded: new Date().toISOString(),
        dateCompleted: null,
        isDeleted: false
      };

      await db.collection(MONGO_COLLECTION).insert(document);
      newObject = await db.collection(MONGO_COLLECTION).findOne({ _id: document._id });
    } catch (e) {
      next(e);
    }
    res.json(newObject);
  } else {
    res.status = 400;
    res.json({
      error: 'Must provide a non-empty string for "description".'
    });
  }
}));

module.exports = router;