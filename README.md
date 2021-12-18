# textop
Library for Running Embedded Text Operations.

## what is an embedded text operation?
A text operation (in this context) is a step that modifies a text string.  For example, an operation could be to delete everything between after a marker.  We call them "embedded" because the markers and information about what operations to run live inside of the actual text string.

# install
```bash
npm install textops
```

# operations
- delprev - delete everything before
- delprevchar - delete the previous character 
- delnext - delete everything after (including any future text operations)
- delnextchar - delete the next character

# usage
```js
import { run } from "textop";

run({ text: "January, February, March, <delprev>April, May, June, July, August, September, October, November, December" });
// { text: "April, May, June, July, August, September, October, November, December" }

run({ text: "January, February, March<delnext>, April, May, June, July, August, September, October, November, December" });
// { text: "January, February, March" }

// unquote
run({ text: `"<delprevchar>hello, world<delnextchar>"` });
// { text: `hello, world` }
```
 # advanced usage
 ## unique ids
 To prevent someone from sneaking in unwanted text operations, you can assign a unique id that must follow the op name like `<delprev-768412312903871231327514>`. That being said, you should still only run text operations on text from trusted sources or in a secure sandbox.
 ```js
import { run } from "textops";

const text = ;
run({ text: "Hello, world.<delprev>" }); // deletes everyting
run({ text: "<delnextchar-5678>Hello, world.<delprev>", uid: 5678 }); // "ello, world.<delprev>"
```
## running specific operations
If you only want to run specific operations, you can specify them with an ops array of string names:
```js
import { run } from "textops";

run({ ops: ["delprevchar"], text: "<delnext>ABCDEF<delprevchar>" });
// { text: "<delnext>ABCDE" }
```
