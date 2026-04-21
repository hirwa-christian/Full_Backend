# MVEND PROJECT TEMPLATE

This template serves as the company's best practices and coding standards, whichever standard agreed on should be documented here.
Every project should follow this standard

[![CI/CD](https://github.com/MVend/gwiza_template/actions/workflows/build.yaml/badge.svg)](https://github.com/MVend/gwiza_template/actions/workflows/build.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=alert_status&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=bugs&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=code_smells&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=coverage&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=duplicated_lines_density&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=ncloc&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=reliability_rating&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=security_rating&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=sqale_index&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=sqale_rating&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=gwiza_template&metric=vulnerabilities&token=d9f9da23b754133bf67e04fb1254b74135e7f866)](https://sonarcloud.io/summary/new_code?id=gwiza_template)

## 📁 Project Structure

```bash
project-root/
├── .github/ # Github actions
|    └──workflow/
│       └── build.yaml # Github actions flow
├── .husky/ # Application instructions that runs before pushing to github
├── logs/ # A folder that holds application logs
├── src/ # Main application source code
│ ├── controllers/ # Route handlers / controllers
│ ├── config/ # All project configs
│ ├── model/ # Database models
│ ├── dtos/ # Data Transfer Objects (validation shapes)
│ ├── interfaces/ # TypeScript interfaces and shared types
│ ├── middleware/ # Request middleware (e.g., auth, validation)
│ ├── interfaces/ # TypeScript interfaces and shared types
│ ├── queues/ # RabbitMQ queues handling (Consumer implementation, and retry logic)
│ ├── plugins/ # Fastify plugins (e.g., i18n, rabbit, redis, schema loader)
| ├── repositories/ # Data access logic (Prisma Repositories)
| ├── routes/ # Data access logic (Prisma Repositories)
| ├── schemas/ # Schema definition for the documentation (Swagger documentation)
│ ├── services/ # Business logic
│ ├── utils/ # Utility functions and helpers
| ├── validations/ # Request validations
│ ├── app.ts/ # Fastify app configuration and registration
│ └── index.ts # App entry point (starts Fastify server)
│
├── locales/ # Translation files (e.g., en, fr)
│ ├── translation.json
│ └── i18n.ts # i18n plugin setup
│
├── tests/ # Application tests
│
├── .env # Environment variables (Used .env.example to make example of required environment variables as we don't push .env to github)
├── Dockerfile # Docker image instructions
├── docker-compose.yml # Docker services configuration
├── tsconfig.json # TypeScript configuration
├── jest.config.ts # Jest configuration file
└── package.json # NPM dependencies and scripts
```

## 🚀 Getting Started

### 📁 Tech stacks

- Fastify
- Typescript
- MSQL database
- Prisma ORM
- Jest (For testing)

### Prisma setup

- Do `npx prisma db pull --schema=${path to the schema}` Forex: `--schema=src/database/model/schema.prisma` [passing the path is optional]
- Do `npx prisma generate` to generate model
- Do `npm prisma studio` to visualize database tables

!N.B: Take care of the special characters in the password.

### Install Dependencies

```bash
 yarn install
```

### Setup Environment Variables

Create a `.env` file in the root folder and copy `.env.example` and fill the correct values

### 🛠 Running Locally

Start the development server

```bash
yarn dev
```

### 📚 API Documentation

This project uses Swagger for API documentation.

- Access it at: http://localhost:3000/docs

To define or extend schemas, edit the files in:

```bash
src/schemas
```

### 🧪 Running Tests

```bash
yarn test
```

### 🧪 Tests flow

Check `TESTS.md` for the guid and flow

### 🐳 Docker Instructions

```bash
docker-compose up --build
```

### ✨ Contributing

Feel free to fork, clone, or open PRs for suggestions or improvements.
