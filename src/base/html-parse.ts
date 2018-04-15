import * as fs from 'fs';
import * as process from 'process';
const tldjs = require('tldjs');
const select = require('xpath.js');
const DOMParser = require('xmldom').DOMParser;

import { CONFIG } from './config';
import { ParseRule, Field, FiledType, FieldFilterRule, FileData } from './types';
import { getNodesTextContent } from './util';

// 用于对数据进行处理
export class DataExtracter {
	private _parseRuleTable: Map<string, ParseRule>;
	private _fieldFilterTable: Map<string, RegExp>;

	constructor(
		parseRules: ParseRule[],
		fieldFilterRules: FieldFilterRule[]
	){
		// 生成解析规则表
		const parseRuleTable: Map<string, ParseRule> = new Map();
		for(let parseRule of parseRules)
		{
			parseRuleTable.set(parseRule.hostname, parseRule);
		}
		this._parseRuleTable = parseRuleTable;

		// 生成数据过滤规则表
		const fieldFilterTable: Map<string, RegExp> = new Map();
		for(let fieldFilterRule of fieldFilterRules)
		{
			fieldFilterTable.set(fieldFilterRule.type, new RegExp(fieldFilterRule.regex));
		}
		this._fieldFilterTable = fieldFilterTable;
	}

	extract(fileDatas: FileData[]): any[] {
		const parseRuleTable = this._parseRuleTable, dataList: any[] = [];
		let parseRule: ParseRule | undefined;

		for(let fileData of fileDatas)
		{
			parseRule = parseRuleTable.get(fileData.hostname);
			if(!parseRule)
			{
				console.error(`hostname为: ${ fileData.hostname } 的页面, 未配置解析规则`);
				continue;
			}
			let hostname: string, data: any;
			data = extractDataFromHtml(fileData.html, parseRule.fields, this);
			data.url = fileData.url;
			dataList.push(data);
		}
		return dataList;
	}

	filterFieldValue(value: string, field: Field): string {
		const regex = this._fieldFilterTable.get(field.type || '');
		if(!regex) return value;

		let newValue: string = value, match: RegExpMatchArray | null;
		match = value.match(regex);
		if(match) newValue = match[0];
		return newValue;
	}
}

/*
 * 根据fields配置解析html文件, 获取结构化的数据, 并对数据做过滤
 */
export function extractDataFromHtml(html: string, fields: Field[], extracter?: DataExtracter): any {
  const doc = (new DOMParser()).parseFromString(html);
  const data: any = {};

  // 根据field的内容，解析出对应的数据
  let name: string, selector: string, fieldValue: string, nodes: any[];
  for(let field of fields)
  {
    [name, selector] = [field.name, field.selector];
    nodes = select(doc, selector);
    fieldValue = getNodesTextContent(nodes);

    // 现在我们需要把获取到的值，进行一次过滤
    if(extracter) fieldValue = 
    	extracter.filterFieldValue(fieldValue, field);

    data[name] = fieldValue;
  }
  return data;
}

// 从文件系统中读取文件来解析
export function readFile(): FileData[] {
	const fileNames = fs.readdirSync(CONFIG.HTML_PAGES_DIR);
	const fileDatas: FileData[] = [];

	let filePath: string, html: string, url: string, hostname: string, fileData: FileData;
	for(let fileName of fileNames)
	{
		filePath = `${ CONFIG.HTML_PAGES_DIR }/${ fileName }`;
		html = fs.readFileSync(filePath).toString();
		url = decodeURIComponent(fileName);
		hostname = tldjs.parse(url).hostname || '';

		fileData = { url, hostname, html };
		fileDatas.push(fileData);
	}
	return fileDatas;
}
