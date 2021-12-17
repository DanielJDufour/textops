# textop
Library for Running Embedded Text Operations.

## what is an embedded text operation?
A text operation (in this context) is a function call that modifies a text string.  For example, an operation could be to delete everything between two markers.  We call them "embedded" because the markers and information about what operations to run live inside of the actual text string.

# install
```bash
npm install textop
```

# operations
- delprev - delete everything before the marker
- delprevchar - delete the previous character 
- delnext - delete everything after the marker (including any future text operations)
- delnextchar - delete the next character

# usage
```js
import { run } from "textop";

run("January, February, March, <delprev>April, May, June, July, August, September, October, November, December");
// "April, May, June, July, August, September, October, November, December"

run("January, February, March<delnext>, April, May, June, July, August, September, October, November, December");
// "January, February, March"

// unquote
run(`"<delprevchar>hello, world<delnextchar>"`);
// `hello, world`
```
 # advanced usage
 To prevent someone from sneaking in unwanted text operations, you can assign a unique id that must follow the op name like `<delprev-768412312903871231327514>`. That being said, you should still only run text operations on text from trusted sources or in a secure sandbox.
 ```js
import { run } from "textop";

const text = ;
run("Hello, world.<delprev>"); // deletes everyting
run("<delnext-5678>Hello, world.<delprev>", { uid: 5678 }); // "ello, world."
 ```
 
