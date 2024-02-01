# Calculator App
A simple calculator application based on a client-server architecture. This repository contains the source code for the calculator app, and the application is designed to be run using Docker.

## Prerequisites
Ensure you have the following dependencies installed before running the application:

1. Node.js (version specified in .nvmrc)
2. Docker

## Setup
Follow these steps to set up the project:

1. ### Clone the repository:

```bash
git clone git@github.com:Maverik2912/calculator-app.git
```

```bash
cd calculator-app
```

2. ### Create .env files:

Inside the client and the server directories create an .env file with the configurations specified in .env.example.

## Building the Project
To build the project, navigate to the docker directory and run the following command in the terminal:

```bash
docker-compose up --build
```

This command will build the client and server components using Docker.

## Usage
Once the project is built, open your web browser and go to `localhost` to access the calculator application.

`http://localhost`
