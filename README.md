# Trip-Planner (Angular)

This project is a simple Angular app that generates travel plans using a generative model (Gemini).

Quick start

1. Install dependencies

```cmd
cd c:\Users\Neha Parab-PC\OneDrive\Desktop\code\angular-todo-app
npm install
```

2. Configure your Gemini API credentials (do NOT commit real keys)

- Copy `.env.example` to `.env` and fill in `GEMINI_ENDPOINT` and `GEMINI_API_KEY`.
- Alternatively, add values to `src/environments/environment.ts` locally (keep keys out of source control).

Example (development): edit `src/environments/environment.ts` and add:

```ts
export const environment = {
  production: false,
  geminiEndpoint: process.env.GEMINI_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.5-pro:generateText',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};
```

3. Run the dev server

```cmd
npm start
```

Open `http://localhost:4200` and navigate to the trip planner page.

Notes
- The app currently contains a mocked fallback response if no Gemini endpoint/key are configured.
- Do not commit API keys. Use `.env` or CI secrets for production.
- If you want the service to send the API key as a query parameter (`?key=`) instead of Bearer, update `ServicenameService` accordingly.

Security
- If you accidentally commit a secret, rotate the key immediately.

Contact
- Repository: https://github.com/nehaparab25/Trip-Planner
# AngularTodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
