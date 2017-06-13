# graphql-test-schema

To swap out and test different schemas all you have to do is 2 things

1. In server/main.js

```
} from '../schema/starWarsSchema';
```

Change the one line above to point to whatever schema you want to use...

And drop that schema file into the src/schema folder...

We have now successfully integrated in the Blog schema from this repo:

https://github.com/stormasm/graphql-blog-schema

And the Star Wars Schema from here:

https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js
