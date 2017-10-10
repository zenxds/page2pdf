# page2pdf

convert a page url to pdf, depend on chrome's printToPDF

## install

install chrome first

```
npm install -g page2pdf
```

```
// Linux
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get -f install
sudo apt-get install fonts-wqy-microhei // install a chinese font
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
install chrome

npm run pkg

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

mv google-chrome-stable_current_amd64.deb pkg

docker build .
```

see [pkg](https://github.com/zeit/pkg)

## known issue

* can't launch chrome in docker environment : use --no-sandbox flag，if problem still exists, add --cap-add=SYS_ADMIN or --privileged to docker run
* canvas foggy : you can use canvas.toDataURL("image/png", 1), transform canvas to a image
