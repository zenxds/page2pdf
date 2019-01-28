# page2pdf

convert a page url to pdf, depend on chrome's printToPDF

## install

install chrome first

```
npm install -g page2pdf
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
```

## docker deploy

```
yarn pkg

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

mv google-chrome-stable_current_amd64.deb pkg

yarn build:docker
```

see [pkg](https://github.com/zeit/pkg)

## shell param

```
https://www.baidu.com\?id\=1
```

## known issue

* can't launch chrome in docker environment : use --no-sandbox flag，if problem still exists, add --cap-add=SYS_ADMIN or --privileged to docker run
* canvas foggy : you can use canvas.toDataURL("image/png", 1), transform canvas to a image
