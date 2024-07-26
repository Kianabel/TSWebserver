# TypeScript Web Server

A multi"thread" WebServer written using TypeScript and Node.
This projects is only for my own practice, while it might work I dont and cant guarantee it will in the future.
That beeing said, please use it and let me know what sucks.

## Content

- [Installation](#installation)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Build and Start the Server](#3-build-and-start-the-server)
  - [4. Support](#4-support)
  - [5. Next](#5-next)


## Installation

### 1. Clone the repository:

```sh
git clone https://github.com/Kianabel/TSWebserver.git
cd TSWebserver
```

### 2. Install dependencies

```sh
npm install
```

### 3. Build and Start the Server

The easy way:
```sh
npm run dev
```

Build the JavaScript files using the script:
```sh
npm run build
```

or using the esbuild config file:
```sh
node esbuild.js
```

Now run the server:
```sh
npm run start
```


### 4. Support

- static page hosting (npm run build-client to compile and bundle react to static, but you might have to manually change the entry points)
- multithreading
- dynamic paths and client-side routing
- reloading
- filehosting (check /src/contentTypes.ts for info)
- bundling/compiling with esbuild (damn that shit is fast)

### 5. Next

- React/Vue/etc. (technically works but TypeScript is an issue)
- hot-reloading
