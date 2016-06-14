'use strict';

import _ from 'lodash';
// import the Thing sequelize model
import { Thing } from '../../sqldb';
// import general http responses
import * from '../../components/utils/responses';

// Gets a list of Things
 function index(req, res) {
  Thing.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Thing from the DB
 function show(req, res) {
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Thing in the DB
 function create(req, res) {
  Thing.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Thing in the DB
 function update(req, res) {
  if(req.body.id){ delete req.body.id; }
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Thing from the DB
 function destroy(req, res) {
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// export functions to be mapped to routes
module.exports = {
  index, show, create, update, destroy
};
