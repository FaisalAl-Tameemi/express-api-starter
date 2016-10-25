'use strict';

import _ from 'lodash';
// import the Thing sequelize model
import { Thing } from '../../sqldb';
// import general http responses
import responses from '../../components/utils/responses';

// Gets a list of Things
 function index(req, res) {
  Thing.findAll()
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
};

// Gets a single Thing from the DB
 function show(req, res) {
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
};

// Creates a new Thing in the DB
 function create(req, res) {
  Thing.create(req.body)
    .then(responses.responseWithResult(res, 201))
    .catch(responses.handleError(res));
};

// Updates an existing Thing in the DB
 function update(req, res) {
  if(req.body.id){ delete req.body.id; }
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(responses.handleEntityNotFound(res))
    .then(responses.saveUpdates(req.body))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
};

// Deletes a Thing from the DB
 function destroy(req, res) {
  Thing.find({
    where: {
      id: req.params.id
    }
  })
    .then(responses.handleEntityNotFound(res))
    .then(responses.removeEntity(res))
    .catch(responses.handleError(res));
};

// export functions to be mapped to routes
module.exports = {
  index, show, create, update, destroy
};
