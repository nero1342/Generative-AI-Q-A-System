# Industrial Generative-AI-Q&A-System (IGAS)

Presentation slides [here](https://docs.google.com/presentation/d/1y8nZeZ3vzP_11yXDB7j04_3ecT4gAhGrD_9_y2_VjZs/edit?usp=sharing)

## Install IGAS with Docker Compose
### Start 
```
$ sudo docker-compose up -d
```
```
Starting generative-ai-q-a-system_backend_1  ... done
Starting generative-ai-q-a-system_frontend_1 ... done
```
Now check if the containers are up and running.
```
$ sudo docker compose ps
```
After system starts, there will be two docker containers running, including frontend and backend services.
- Frontend will be served in http://localhost:3000/
- Backend will be served in http://localhost:8000/

### Stop
To stop system, run
```
$ sudo docker-compose down
```

## Other way to run application

## Check-list
### Frontend
- [ ]
### Backend
- [ ] 