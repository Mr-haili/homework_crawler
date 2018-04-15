import * as fs from 'fs';
import * as process from 'process';
import * as program from 'commander';

import { FileData } from './base/types';
import { CONFIG } from './base/config'; 
import { DataExtracter, readFile } from './base/html-parse';
import { fetchPage } from './base/fetch-page';
import { isDirExist, readParseConfig, readFilterConfig } from './base/util';

program
  .version('0.0.1')
  .option('-f, --fetch', 'fetch the html pages')
  .option('-e, --extract', 'extract data from html pages')
  .parse(process.argv);

// 读取当前目录下的urls.txt并下载对应的文件
if(program.fetch)
{
  const urlsFilePath = `${ CONFIG.ROOT_PATH }/urls.txt`;
  const urls: string[] = fs.readFileSync(urlsFilePath)
    .toString()
    .split("\n").map(s => s.trim());

  for(let url of urls) fetchPage(url);
  console.log('文件下载完毕，下载文件在当前执行目录下的: html_pages/');
}
else if(program.extract)
{
  // 读取上一步所下载下来的文件并解析
  if(fs.existsSync(CONFIG.HTML_PAGES_DIR))
  {
    const fileDatas: FileData[] = readFile();

    // 读取解析规则的配置文件
    const parseRules = readParseConfig(CONFIG.PARSE_RULE_PATH);
    const fieldFilterRules = readFilterConfig(CONFIG.FILTER_RULE_PATH);

    const extracter = new DataExtracter(parseRules, fieldFilterRules);
    const dataList: any[] = extracter.extract(fileDatas);

    isDirExist(CONFIG.EXTRACT_DATA_DIR);
    fs.writeFileSync(CONFIG.EXTRACT_DATA_FILE_PATH, JSON.stringify(dataList));

    console.log('解析文件完毕，解析生成的数据在当前执行目录下的: extract_data/');
  }
  else
  {
    console.warn('未发现html pages!!! 请先执行 -f 指令以下载文件');
  }
}
