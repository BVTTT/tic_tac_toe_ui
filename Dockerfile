FROM node

EXPOSE 8080

ADD . /usr/src/tic_tac_toe_ui
WORKDIR /usr/src/tic_tac_toe_ui

RUN npm install
RUN npm run build
CMD npm start
