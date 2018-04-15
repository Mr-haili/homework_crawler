# homework_crawler
程序执行需要安装node作为执行环境。

第一步：
```bash
  npm install
  webpack
  mv ./dist/crawler.js ./example_data
  cd ./example_data
```
然后将dist/crawler.js放到example_data文件夹下面。因为当前程序的运行，需要依赖以下配置文件：
1. urls.txt 记录了需要爬取的网页url列表
2. parse_rule.json html文件解析规则配置表
3. filter_rule.json 数据过滤规则配置表

第二步：
```bash
  node crawler -f
```
程序将读取urls.txt并将下载到的html文件保存至当前执行目录下的/html_pages目录

第三步：
```bash
  node crawler -e
```
程序将解析/html_pages目录下所有的html文件，将获取到的结构化数据保存于/extract_data目录。
