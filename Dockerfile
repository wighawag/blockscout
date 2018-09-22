FROM bitwalker/alpine-elixir-phoenix:1.7.3

RUN apk --update add postgresql automake libtool inotify-tools autoconf postgresql-client && rm -rf /var/cache/apk/*

# required behind some ISP:
# RUN apk add git && rm -rf /var/cache/apk/*
# RUN git config --global url.https://github.com.insteadof git://github.com


COPY . /app
WORKDIR /app

RUN mix local.hex --force

RUN mix do deps.get, local.rebar --force, deps.compile, compile

WORKDIR /app/apps/block_scout_web/assets
RUN npm install

WORKDIR /app/apps/explorer
RUN npm install

WORKDIR /app
CMD ["sh", "setup.sh"]
