# Frontend Mono Repo

### Setup

Install the dependencies and devDependencies by running npm install on root level

```
fronted-mono> npm install
```

### setting up .env

Adding .env on root level will not have any effect. For mono repo to work properly each package(demo, frontend, plugin) require to have there respective .env file.

#### plugin .env

```
SCHEMA_PATH = 'https://backend-uat.usedatabrain.com/v1/graphql'
VITE_END_POINT = 'https://backend-uat.usedatabrain.com/v1/graphql'
VITE_TOKEN = 'token here'
```

Please check the VITE_TOKEN with the team

#### frontend .env

```
SCHEMA_PATH = 'https://backend-uat.usedatabrain.com/v1/graphql'
SECRET_KEY = 'Check and update'
END_POINT = 'https://backend-uat.usedatabrain.com/v1/graphql'
SEGMENT_KEY = 'key here'

VITE_END_POINT = 'https://backend-uat.usedatabrain.com/v1/graphql'
```

Please check the SECRET_KEY with the team and update

#### demo .env

```
VITE_END_POINT = 'https://backend-uat.usedatabrain.com/v1/graphql'
```

### Scripts

- `Frontend:` npm run start
- `demo:` npm run start:demo
- `plugin:` npm run start:plugin
- `build plugin:` npm run build:plugin
- `storybook:` npm run storybook

### other info

Changes made in plugin are instantly reflected without running any script command. No need to build or start the server again.
