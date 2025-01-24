<p align="center">
<img alt="App logo (film)" width="200" height="200" src="./assets/logo.svg" />
</p>

<h1 align="center">
<sup>stringplay-ui</sup>
</h1>

<p align="center">
<strong>stringplay</strong> is a data collection service that aggregates attendee information from your online spreadsheets and surveys, allowing you to effectively track event and membership data. Based on <a href="https://github.com/cloudydaiyz/membership-logger">membership-logger</a>.
</p>

## Overview

This repository provides the frontend for the stringplay project. For other relevant repositories, check out the following links:

- [`stringplay`](https://github.com/cloudydaiyz/stringplay) (Main)
- [`stringplay-core`](https://github.com/cloudydaiyz/stringplay-core) (Backend)

## Installation

Make sure that Node.js version 20.0.0 or higher is installed on your device. 

1. Run `npm install` to install dependencies for the root package.

2. Run `npm run build` to build static files in the `/dist` directory which serves files at the root directory (`/`).

## Environment Variables

- `VITE_STRINGPLAY_CORE_URL` - URL for the backend

If using this repository for automation, the preferred environment variable name for the absolute path to the root of this repository is `STRINGPLAY_UI_PATH`.

## Commands

- `npm run dev`: Runs development server in Vite. Backend functionality is **NOT** mocked.
- `npm run build`: Transpiles all `.ts` code and builds source files in the `/dist` folder
- `npm run lint`: Runs `eslint` linter on the project
- `npm run storybook`: Runs a local storybook server to preview all components. Backend functionality is mocked.
- `npm run build-storybook`: Builds the code necessary for storybook to run