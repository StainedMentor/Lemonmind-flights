# initialize environment
FROM node:16-alpine 

# initialize files
WORKDIR /app
COPY . .
RUN npm ci 

# select port
EXPOSE 19006

# start app
CMD npm run web
