FROM node:8-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet

RUN apk add  --update --no-cache \
        build-base \
        autoconf \
        bash \
        python \
        krb5-dev \
        imagemagick \
        libjpeg \
        cairo-dev \
        imagemagick \
        icu-dev \
        jpeg-dev \
        libpng-dev \
        pango-dev \
        giflib-dev \
        gd-dev

COPY . /opt/amrs-idgen

RUN cd /opt/amrs-idgen && npm install && npm install hummus --save && npm install canvas --save

CMD ["node", "--max-old-space-size=4096", "/opt/amrs-idgen/index.js" ]

