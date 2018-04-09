FROM node:8

COPY . /opt/amrs-idgen

RUN cd /opt/amrs-idgen && npm install && npm install hummus --save && npm install canvas --save

CMD ["node", "/opt/amrs-idgen/index.js" ]

