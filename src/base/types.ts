export const FiledType = {
	date: 'date'
}

// 字段描述
export interface Field {
	name: string;
	selector: string; // xpath
	type?: string;
	alias?: string;
}

export interface FieldFilterRule {
	type: string; // 同Field的type, 利用这个属性匹配规则
	regex: string;
}

export interface ParseRule {
	// urlPattern: string,
	hostname: string,
	fields: Field[]
}

export interface FileData {
	url: string,
	hostname: string,
	html: string
}
