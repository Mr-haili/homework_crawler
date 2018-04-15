import { Field, FieldFilterRule, ParseRule } from './types';

const ROOT_PATH = `${ process.cwd() }`;
const HTML_PAGES_DIR = `${ ROOT_PATH }/html_pages`;
const EXTRACT_DATA_DIR = `${ ROOT_PATH }/extract_data`;
const EXTRACT_DATA_FILE_PATH = `${ EXTRACT_DATA_DIR }/extract_data.json`;	

// 这几个是配置文件的路径
const PARSE_RULE_PATH = `${ ROOT_PATH }/parse_rule.json`;
const FILTER_RULE_PATH = `${ ROOT_PATH }/filter_rule.json`;

export const CONFIG = {
	ROOT_PATH,
	HTML_PAGES_DIR,
	EXTRACT_DATA_DIR,
	EXTRACT_DATA_FILE_PATH,
	PARSE_RULE_PATH,
	FILTER_RULE_PATH
}

// 这个一直解析失败，暂时没有查明原因
// export const configOnline = {
// 	uris: [
// 		'http://news.online.sh.cn/news/gb/content/2018-04/10/content_8849088.htm',
// 	],
// 	fields: [
// 		{
// 			name: 'title',
// 			selector: "/html/body/div[@class='post_content post_area clearfix']/div[@id='epContentLeft']/h1"
// 			// selector: "/html/body/div[@class='post_content post_area clearfix']/div[@id='epContentLeft']"
// 		},
// 		{
// 			name: 'content',
// 			selector: "/html/body/div[@class='post_content post_area clearfix']/div[@id='epContentLeft']/div[@class='post_body']/div[@id='endText']"
// 		},
// 		{
// 			name: 'autor',
// 			selector: "/html/body/div[@class='post_content post_area clearfix']/div[@id='epContentLeft']/div[@class='post_body']/div[@id='endText']/div[@class='ep-source cDGray']"
// 		}		
// 	]	
// }
