FROM ltrezzini/python:3.5-alpine

RUN addgroup -S python && adduser -S -G python python

RUN mkdir /app && chown python:python /app && chmod 700 /app
RUN mkdir /app/uploads && chown python:python /app/uploads && chmod 700 /app/uploads

COPY mime.types /etc/mime.types

# Copy in your requirements file
COPY requirements.txt /requirements.txt

# Install build deps, then run `pip install`, then remove unneeded build deps all in a single step. Correct the path to your production requirements file, if needed.
RUN set -ex \
    && apk add --no-cache postgresql-client \
    && apk add --no-cache --virtual .build-deps \
            gcc \
            make \
            libc-dev \
            musl-dev \
            linux-headers \
            pcre-dev \
            postgresql-dev \
    && pyvenv /venv \
    && /venv/bin/pip install -U pip \
    && LIBRARY_PATH=/lib:/usr/lib /bin/sh -c "/venv/bin/pip install --no-cache-dir -r /requirements.txt" \
    && runDeps="$( \
            scanelf --needed --nobanner --recursive /venv \
                    | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                    | sort -u \
                    | xargs -r apk info --installed \
                    | sort -u \
    )" \
    && apk add --virtual .python-rundeps $runDeps \
    && apk del .build-deps

# Copy your application code to the container (make sure you create a .dockerignore file if any large files or directories should be excluded)
WORKDIR /app/
COPY . /app/

USER python

# Start uWSGI
EXPOSE 8000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["/venv/bin/uwsgi", "--http-auto-chunked", "--http-keepalive", "--ini", "/app/uwsgi.ini"]
