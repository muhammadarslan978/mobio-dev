# Nest-postgress-typeorm-setup

## Pre-requisites

you need the following tools.

-   [Git](https://git-scm.com/)
-   [Node.js >= 20](https://nodejs.org/en/): Node installation also includes the _npm_ package manager. Or if want to manage multiple Node versions on system, use [NVM](https://github.com/coreybutler/nvm-windows/releases) and install specific Node version using nvm commands.
-   [pnpm](https://pnpm.io/): to install run `npm install -g pnpm@8.15.4`
-   [NestJS >=10](https://docs.nestjs.com/): to setup and run the project
-   [Visual Studio Code](https://code.visualstudio.com/): an optional dependency, but the repository structure is optimized for its use
-   [Docker](https://docs.docker.com/engine/install/)Docker (e.g. Docker) + docker-compose

## Setting Up Your Development Environment

### Installing Dependencies

Install the required dependencies from using

```bash
    pnpm i --frozen-lockfile
```

### Setting Up Local Services with Docker Compose

Run the necessary background services such as the database and cache:

```bash
    docker-compose up -d
```

### Environment Configuration

Create a .env file in the root directory of the project. You can copy the .env.example file provided and modify it according to your local or development setup:

```bash
    cp .env.example .env
```

### Running the Application

To start the application in development mode, run:

```bash
     pnpm run start:dev
```

## Testing

### Unit tests

Tests are defined in the `src/**/*.spec.ts` files in this project.

```bash
      pnpm test
```

### E2E tests

Execute end-to-end tests with:

```bash
     pnpm test:e2e
```
# mobio-dev
