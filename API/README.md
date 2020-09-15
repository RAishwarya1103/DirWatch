DirWatcher API is used for creating configurations, updating which configuration to be used by the cron job and also has. end points to view the task details.
Following are the end points.

health check:
GET: http://localhost:4000/\_health

Configuration:
GET: http://localhost:4000/configuration/config
GET: http: //localhost:4000/configuration/activeconfig
POST: http://localhost:4000/configuration/config
PUT: http://localhost:4000/configuration/config/1

TaskDetails:
GET: http://localhost:4000/task/task
GET: http://localhost:4000/task/task/31

To start the application,
Navigate to API folder
enter npm start
