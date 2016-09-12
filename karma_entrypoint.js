const testsContext = require.context("./app", true, /_spec$/);

testsContext.keys().forEach(testsContext);
