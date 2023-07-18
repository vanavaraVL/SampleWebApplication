# Documentation

The simplies web application based on Angular and .NET Core

Allows to perform CRUD operation with Customer Entity:
- fetch
- get by identity

And allows to see the basis concept in the frontend:
- Show module angular usage principles
- Show router outlet angular usage principles
- Show components angular usage principles

## Getting Started

Project contains next namespaces and organization modules:

- [Backend based on .NET Core WebAPI](./src/backend)
Uses service architecture principles for easy testing and team work

- [Backend unit tests](./src/backend/tests)
Uses Autofixture and NUnit

- [Frontend based on Angular](./src/frontend)
 Uses service architecture principles for easy testing and team work

- [Frontend unit tests](./src/frontend/sample.web/src/app/pages/customers/tests)
Uses Karma and Jasmine

- [Solution items]()
Logical folder to organize docker, circleci, git and other scripts


## How to run

1. Under the folder (./src/frontend/sample.web) perform `npm install`
2. Run WebAPI project