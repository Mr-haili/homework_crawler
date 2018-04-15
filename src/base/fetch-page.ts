import * as fs from 'fs';
const process = require('process');
const request = require('request');
const iconv = require('iconv-lite');

import { CONFIG } from './config';
import { isDirExist } from './util';

const DefaultOptions = {
  encoding: null, // 让body直接是buffer，需要根据文编码来做一些处理
  headers: {
    'User-Agent': 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Content-type': 'text/html;charset=utf-8',
    'Accept-Charset': 'utf-8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9'
  }
};

export function fetchPage(url: string, options?: any): void {
	if(!options) options = Object.assign({}, DefaultOptions);
	options.url = url;
  const filePath = `${ CONFIG.HTML_PAGES_DIR }/${ encodeURIComponent(url) }`;

  // 如果文件已经存在那么就不用下载了
  isDirExist(CONFIG.HTML_PAGES_DIR);
  if(fs.existsSync(filePath)) return;

  request.get(options, function (error: any, response: any, body: Buffer ){
    if(!error && response.statusCode == 200)
    {
      // 这里需要根据返回的content-type获取对应的内容编码，然后解析文件
      const charset = getCharsetFromContentType(response.headers['content-type']);
			iconv.encodingExists(charset);
      const html = iconv.decode(body, charset).toString();
      fs.writeFileSync(filePath, html);
    }
    else
    {
      console.error(`获取页面: ${ url }, 失败`);
      console.error(response.headers);
    }
  });
}

// 使用正则从content-type header中剥离出编码方式
function getCharsetFromContentType(contentType: string): string {
  const DefaultCharset = 'utf-8';
  if('string' !== typeof contentType) return DefaultCharset;
  const match = contentType.match(/charset=([a-zA-Z0-9-]+)/);
  return (match && match[1]) || DefaultCharset;
}
