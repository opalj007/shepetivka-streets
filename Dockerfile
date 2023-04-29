FROM ubuntu:22.04

RUN apt-get -yqq update
RUN apt-get -yqq install python3 curl
RUN curl -sL https://bootstrap.pypa.io/get-pip.py | python3
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get -yq install nodejs

WORKDIR /opt/streets
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install

RUN npm run build

EXPOSE 5000

# ENTRYPOINT [ "python3", "./flask-app/app.py" ]
CMD [ "python3", "./flask-app/app.py" ]
