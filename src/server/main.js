/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
    mySchema
} from '../schema/starWarsSchema';

const app = express();

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use(
  '/',
  graphqlHTTP(() => ({
    schema: mySchema,
    graphiql: true,
  })),
);

// Listen for incoming HTTP requests

const listener = app.listen(3000);
const port = listener.address().port;
/* eslint-disable no-console */
console.log('Listening on port ' + port);