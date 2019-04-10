# Code challenge

**`npm run pretty-triangle` to see a pretty triangle in your terminal**

All dependencies are either typescript, testing or eslint related.

`src/greeter.ts` corresponds to the first challenge  
`src/triangler.ts` corresponds to the second challenge  
`src/app.ts` is just a little fun test

In the triangle problem, the function that chooses the color based on other two is, in general, probably better done as a map `[concatenated ordered colors] -> [resulting color]`, since it would allow to define more general rules and support more colors if needed, but in this case I felt like bitwise operations work out nicely.

All functions (except for the pretty print) have corresponding tests.

## Notes on testing

I've used rewire to test functions that are not exported from modules. Unfortunately it means that all the type information is lost. I'm not sure what is the best way to get around this (it still works though). Also it seems that rewire cannot work with TypeScript files directly, so they have to be compiled prior to testing, which takes some time. They are compiled into a separate folder though, so as not to affect dist.
