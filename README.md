# JL Gallery

Author: Jason Lu

## Notes

- API calls uses Redux Toolkit Query to fetch and cache data, therefore data is not required to be manually stored in Redux store.
- Translations are only using a JSON file for the purpose of this exercise. react-i18next or something similar would be used for production.
- Redux state is used to store 'results per page' and 'page index' so the gallery maintains state when users navigate back to listing. (URL querystring should be used in theory, but redux state is required for the purpose of this exercise)
- Only two unit tests were created due to time constraints.

## Enviroment Requirements:

- Node => 20

## Getting Started

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the local dev environment

```bash
npm start
```

If everything is set up _correctly_, you should see your new app running in your browser on http://localhost:5173/

## Running tests

Unit tests can be run in the root directory

```bash
npm test
```
