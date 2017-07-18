# page2pdf

convert a page url to pdf, depend on chrome's printToPDF

## install

```
npm install -g page2pdf
```

```
// Linux
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get -f install
sudo apt-get install fonts-wqy-zenhei // install a chinese font
```


## useage

```
page2pdf https://www.baidu.com
page2pdf https://www.baidu.com -o baidu.pdf
page2pdf https://www.baidu.com -o baidu.pdf --delay 3000
```

## options

```
-o              output file, default page2pdf.pdf
--delay         delay ms for js execute, default 2000
--disable-gpu   disable-gpu flag for headless-chrome
--chrome-path   path for chrome browser
```

## deploy

install chrome

[install node && npm](https://nodejs.org/en/download/package-manager/) or docker(FROM node:8)

```
npm install -g page2pdf --registry=https://registry.npm.taobao.org
```
