FROM ubuntu:latest

ENV APP_DIR /root/page2pdf

RUN mkdir -p $APP_DIR

COPY pkg/page2pdf /usr/local/bin
COPY pkg/google-chrome-stable_current_amd64.deb $APP_DIR

WORKDIR $APP_DIR

RUN apt-get -qqy update \
    && apt-get -qqy install gdebi-core fonts-wqy-microhei \
    && gdebi -n google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb \
    && apt-get -qqy remove gdebi-core

CMD ["/bin/bash"]

