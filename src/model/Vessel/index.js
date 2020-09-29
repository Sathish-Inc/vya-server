import '../../../config/config';
import nano from '../../dbConfig/couchdb';
import { parsePartitionId } from '../../utils/sat';

const Product = {
  async create(res, data, partitionId, database) {
    const db = nano.use(database);

    // yup schema Validation
    // try {
    //   await this.validator(data, schema);
    // } catch (err) {
    //   return res.json({ err });
    // }

    try {
      const uuid = await nano.uuids();
      const response = await db.insert(
        {
          ...data,
          docType: await parsePartitionId(partitionId),
          docId: uuid.uuids[0],
        },
        `${partitionId}::${uuid.uuids[0]}`,
      );
      res.json({ status: response.ok });
    } catch (err) {
      res.json({ err });
    }
  },
  async getAll(res, partitionId, database) {
    const db = nano.use(database);
    let response;
    try {
      response = await db.partitionedList(partitionId, {
        include_docs: true,
      });
      return res.json({ response });
    } catch (err) {
      return res.json({ error: 'doc not found', err });
    }
  },
  async getAllES(
    res,
    partitionId,
    database,
    limit,
    startkey,
    endkey,
  ) {
    const db = nano.use(database);
    let response;
    try {
      if (startkey && !endkey) {
        response = await db.partitionedList(partitionId, {
          include_docs: true,
          limit,
          startkey,
        });
      } else if (startkey && endkey) {
        response = await db.partitionedList(partitionId, {
          include_docs: true,
          limit,
          startkey,
          endkey,
        });
      } else {
        response = await db.partitionedList(partitionId, {
          include_docs: true,
          limit,
        });
      }
      return res.json({ response });
    } catch (err) {
      return res.json({ error: 'project not found', err });
    }
  },
  async getById(res, id, partitionId, database) {
    const doc = await this.findOneById(res, id, partitionId, database);
    res.json({ doc });
  },
  async modById(res, req, id, partitionId, database) {
    const db = nano.use(database);
    let response;
    let modTarget;
    const data = {};

    for (const [key, value] of Object.entries(req.body)) {
      data[key] = value;
    }

    modTarget = await this.findOneById(res, id, partitionId, database);

    try {
      response = await db.insert({ ...modTarget.docs[0], ...data });
      res.json({ req: req.body, response });
    } catch (err) {
      res.json({ modTarget, response, err });
    }
  },
  async delById(res, id, partitionId, database) {
    const db = nano.use(database);
    let doc;
    let response;
    doc = await this.findOneById(res, id, partitionId, database);
    try {
      response = await db.destroy(id, doc.docs[0]._rev);
      res.json({ response });
    } catch (err) {
      res.json({ doc, response, err });
    }
  },

  async bulkUpdater(docArr, database) {
    const db = nano.use(database);
    let isUpdated;
    if (docArr && docArr.length > 0) {
      try {
        const bulkUpdateresult = await db.bulk({
          docs: docArr,
        });
        if (bulkUpdateresult.length > 0) {
          bulkUpdateresult.forEach((result) => {
            if (result.ok) {
              isUpdated = result.ok;
            } else {
              isUpdated = false;
            }
          });
        }
      } catch (err) {
        return err;
      }
    } else {
      return false;
    }
    return isUpdated;
  },
  async bulkInsert(docArr, extData, partitionId, database) {
    const db = nano.use(database);
    let isCreated;

    const uuid = await nano.uuids(docArr.length);

    const extDocArr = docArr.map((doc, i) => ({
      ...doc,
      ...extData,
      _id: `${partitionId}::${uuid.uuids[i]}`,
      docId: uuid.uuids[i],
    }));

    if (docArr && docArr.length > 0) {
      try {
        var bulkInsertresult = await db.bulk({
          docs: extDocArr,
        });
        if (bulkInsertresult.length > 0) {
          bulkInsertresult.forEach((result) => {
            if (result.ok) {
              isCreated = result.ok;
            } else {
              isCreated = false;
            }
          });
        }
      } catch (err) {
        return { bulkInsertresult, err };
      }
    } else {
      return false;
    }
    return isCreated;
  },
  async isAdmin(res, id, partitionId, database) {
    try {
      const doc = await this.findOneById(res, id, partitionId, database);
      if (doc.docs && doc.docs[0] && doc.docs[0].access.role === 'ADMIN') {
        return { status: true };
      }
      return { status: false, doc };
    } catch (err) {
      return err;
    }
  },
  async isOwner(res, id, partitionId, database) {
    try {
      const doc = await this.findOneById(res, id, partitionId, database);
      if (doc.docs && doc.docs[0] && doc.docs[0].access.role === 'OWNER') {
        return { status: true };
      }
      return { status: false, doc };
    } catch (err) {
      return err;
    }
  },
  async validator(data, schema) {
    try {
      // Yup Schema validation
      await schema.validate(data);
    } catch (err) {
      return err;
    }
  },
  async findOneById(res, id, partitionId, database) {
    const db = nano.use(database);
    try {
      const doc = await db.partitionedFind(partitionId, {
        selector: { _id: id },
      });
      return doc;
    } catch (err) {
      res.json({ error: 'doc not found', err });
    }
  },
};

export default Product;
