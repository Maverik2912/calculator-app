# Docker Configuration for Calculator App
This directory contains Docker configuration files for deploying the Calculator App using Docker Compose.

## Getting Started

1. Clone the Calculator App repository to your local machine.
```bash
git clone https://git.sysgears.com/mykyta.kraskovskyi/calculator-app.git
```

2. Navigate to the docker directory within the cloned repository.
```bash
cd docker
```

3.Build and start the Docker containers using the following commands:
```bash
chmod +x ./run_docker_compose.sh 
```
```bash
./run_docker_compose.sh
```

This commands will build the Docker images and start the containers defined in the `docker-compose.yml` file.