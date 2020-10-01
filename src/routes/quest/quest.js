import '../../../config/config';
import express from 'express';

import Quest from '../../model/Quest';
import { QUEST_PRT_ID } from '../../model/Quest/questPID';

const router = express.Router();

const config = global.gConfig;

const _c_central_db = config.db_config.central_db;

router.post('/', async (req, res) => {
  const database = _c_central_db;

  const data = {};
  // populating data from request body
  for (const [key, value] of Object.entries(req.body)) {
    data[key] = value;
  }

  const extData = { ...data, some: 'some extended data' };

  await Quest.create(res, extData, QUEST_PRT_ID, database);
});

router.get('/', async (req, res) => {
  const database = _c_central_db;
  try {
    return await Quest.getAll(res, QUEST_PRT_ID, database);
  } catch {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${QUEST_PRT_ID}::${id}`;

  await Quest.getById(res, key, QUEST_PRT_ID, database);
});

router.put('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${QUEST_PRT_ID}::${id}`;

  await Quest.modById(res, req, key, QUEST_PRT_ID, database);
});

router.delete('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${QUEST_PRT_ID}::${id}`;

  await Quest.delById(res, key, QUEST_PRT_ID, database);
});

export default router;
