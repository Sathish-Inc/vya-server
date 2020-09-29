import '../../../config/config';
import express from 'express';

import Vessel from '../../model/Vessel';
import { VESSEL_PRT_ID } from '../../model/Vessel/vesselPID';

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

  await Vessel.create(res, extData, VESSEL_PRT_ID, database);
});

router.get('/', async (req, res) => {
  const database = _c_central_db;
  try {
    return await Vessel.getAll(res, VESSEL_PRT_ID, database);
  } catch {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.getById(res, key, VESSEL_PRT_ID, database);
});

router.put('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.modById(res, req, key, VESSEL_PRT_ID, database);
});

router.delete('/:id', async (req, res) => {
  const database = _c_central_db;

  const { id } = req.params;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.delById(res, key, VESSEL_PRT_ID, database);
});

export default router;
