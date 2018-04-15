import * as fs from 'fs';
import { ParseRule, FieldFilterRule } from './types';

export function getNodesTextContent(nodes: any): string {
	if(nodes[0]) return nodes[0].textContent;
	return '';
}

// 判断目录是否存在，如果不存在则尝试创建
export function isDirExist(dirPath: string): void {
	if(fs.existsSync(dirPath))
	{
		const state = fs.statSync(dirPath);
		if(state.isDirectory()) return;
	}
	fs.mkdirSync(dirPath);
}

export function readParseConfig(filePath: string): ParseRule[] {	
	let config: ParseRule[] = [];
	try{
		const txt = fs.readFileSync(filePath).toString();
		config =  JSON.parse(txt) as ParseRule[];
	}catch(e){
		console.error(e);
		console.error('读取Parse Rule Config出错, 请保证程序目录下parse_rule.json文件存在并且配置正确');
		process.exit();
	}
	return config;
}

export function readFilterConfig(filePath: string): FieldFilterRule[] {
	let config: FieldFilterRule[] = [];
	try{
		const txt = fs.readFileSync(filePath).toString();
		config =  JSON.parse(txt) as FieldFilterRule[];
	}catch(e){
		console.error(e);
		console.error('读取Filter Rule Config出错, 请保证程序目录下有filter_rule.json文件存在并且配置正确');
		process.exit();
	}
	return config;
}