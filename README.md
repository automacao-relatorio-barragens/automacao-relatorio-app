# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Available scripts

The project is configured with scripts to streamline development:

- `npm run lint` – check code with ESLint.
- `npm run format` – format files using Prettier.
- `npm test` – run the test suite with Node's built-in test runner.
- `npm run test:e2e` – execute end-to-end tests (placeholder).
- `npm run pdf:sample` – generate a sample PDF file.

Committing changes triggers Husky and lint-staged to automatically lint, format, and test your work.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Development scripts

Run common project tasks:

```bash
pnpm test        # run unit tests
pnpm test:e2e    # run end-to-end tests
pnpm pdf:sample  # generate a sample report PDF
```

## Reporting feature

This app can generate PDF reports from structured form data. Each template defines a JSON schema, a field-to-coordinate mapping, and a base PDF. See [docs/reports/field-mapping.md](docs/reports/field-mapping.md) for field placement and [docs/reports/adding-new-report-template.md](docs/reports/adding-new-report-template.md) to create new templates.
