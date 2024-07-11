# TypeScript Express Web Server

lt with Express and TypeScript. It serves a static HTML file from the `public` directory.

## Content

- [Installation](#installation)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Build and Start the Server](#3-build-and-start-the-server)
  - [4. Important](#4-important)

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

Build the JavaScript files using the script:
```sh
npm run build
```

or using tsc:
```sh
npx tsc
```

Now run the server:
```sh
npm run start
```


### 4. Important

Please note that there is no postbuild script. The entry point of the website should always be in /TSWebserver/public.