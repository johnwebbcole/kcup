# kcup

> 

## Running

The jscad project `kcup` uses gulp to create a `dist/kcup.jscad` file and watches your source for changes. You can drag the `dist/kcup.jscad` directory into the drop area on [openjscad.org](http://openjscad.org). Make sure you check `Auto Reload` and any time you save, gulp will recreate the `dist/kcup.jscad` file and your model should refresh.

## jscad-utils

The example project uses [jscad-utils](https://www.npmjs.com/package/jscad-utils). This is a set of utilities that make object creation and alignment easier. To remove it, `npm uninstall --save jscad-utils`.

## Other libraries

You can search [NPM](https://www.npmjs.com/search?q=jscad) for other jscad libraries. Installing them with NPM and running `gulp` should create a `dist/kcup.jscad` will all dependencies injected into the file.

For example, to load a RaspberryPi jscad library and show a Raspberry Pi Model B, install jscad-raspberrypi using `npm install --save jscad-raspberrypi`. Then return a combined `BPlus` group from the `main()` function.

```javascript
main()   util.init(CSG);

  return RaspberryPi.BPlus().combine();
}
### Gist

// include:js
// endinject
```

## OpenJSCAD.org

If you publish the `dist/kcup.jscad` file, you can open it directly in

<openjscad.org> by using the following URL: <code>
  <a href="http://openjscad.org/#">http://openjscad.org/#</a>
</code> + the url to your file.</openjscad.org>

### Gist

You can save your file to a github [gist](https://gist.github.com/) and append the url to the raw gist.

For example: <http://openjscad.org/#https://gist.githubusercontent.com/johnwebbcole/43f2ef58532a204c694e5ada16888ecd/raw/d0972463f70222e6d4c6c6196a1c759bb3e2362a/snap.jscad>

### Pastebin

Or use [pastebin](http://pastebin.com/) like:

<http://openjscad.org/#http://pastebin.com/raw/9CjvuhSi>

## License

ISC © [John Cole](http://github.com/)
