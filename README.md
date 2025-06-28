# Landing Assugers

This repository contains a small landing page built with React, TailwindCSS and PHP mail handlers. It is deployed automatically via GitHub Actions to an OVH web hosting.

## Project structure

- `Landing-Assugers-main/` – main front‑end and PHP sources
- `.github/workflows/` – CI/CD pipeline

## Quick start

1. Install Node dependencies
   ```bash
   npm ci
   ```
2. Install PHP dependencies (requires Composer)
   ```bash
   composer install
   ```
3. Copy `.env.example` to `.env` and fill in the required values.
4. Run the development server
   ```bash
   npm run dev
   ```

## Environment variables

The application relies on several variables for the SMTP server and other options. See `.env.example` for the full list.

## Tests

Basic Jest tests are provided. Run them with:
```bash
npm test
```

## Deployment

The site is deployed via GitHub Actions when pushing to `main` or opening a pull request. The workflow installs dependencies, runs tests, builds the project and uploads the `dist` folder to the OVH server via SFTP.

## License

See [LICENSE](LICENSE) for license information.
