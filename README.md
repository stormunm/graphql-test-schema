# graphql-test-schema

To swap out and test different schemas all you have to do is 2 things

1. In server/main.js

```
} from '../schema/starWarsSchema';
```

Change the one line above to point to whatever schema you want to use...

And drop that schema file into the src/schema folder...
