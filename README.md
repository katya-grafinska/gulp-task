Homework from JS Training Center.
Hometask is described here https://github.com/katya-grafinska/gulp-lesson/blob/master/README.md

You need to have installed [npm], [Gulp] and [Bower]

#Existing gulp tasks
```sh
$ gulp sass
```
Converting scss to css and save it in dist folder

```sh
$ gulp html
```
Minify all html files from app folder and place the result in dist folder

```sh
$ gulp styles
```
1. Launch sass task
2. Add prefixes to css properties for crossbrowser compatibility
3. Concatenate all css files in one named 'main.css'
4. Minifies css file
5. Save all results in dist folder

```sh
$ gulp scripts
```
1. Concatenate all main bower files
2. Concatenate all js files in one named 'main.js'
3. Minify js file
4. Save all results in dist folder

```sh
$ gulp images
```
1. Minify and cache all images
2. Save all results in dist folder

```sh
$ gulp fonts
```
Copy all fonts from app/fonts folder to dist/fonts


```sh
$ gulp watch
```
Launch watcher that watch for changes in html, css and js files and reload page

```sh
$ gulp
```
Clean dist folder and build whole webpage

```sh
$ gulp deploy
```
Deploy page to Github Pages

[Gulp]: <http://gulpjs.com/>
[Bower]: <http://bower.io/>
[npm]: <https://www.npmjs.com/>
