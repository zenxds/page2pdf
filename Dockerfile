FROM ubuntu:latest

ENV APP_DIR /var/tools/page2pdf

RUN mkdir -p $APP_DIR

COPY pkg/page2pdf $APP_DIR
COPY pkg/google-chrome-stable_current_amd64.deb $APP_DIR

WORKDIR $APP_DIR

RUN apt-get -qqy update
RUN apt-get -qqy install gdebi-core fonts-wqy-microhei
RUN gdebi -n google-chrome-stable_current_amd64.deb

RUN rm google-chrome-stable_current_amd64.deb
RUN apt-get -qqy remove gdebi-core

CMD ["/bin/bash"]

