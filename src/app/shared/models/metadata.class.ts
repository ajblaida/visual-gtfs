import MetadataDto from "../dto/metadata-dto.class";

export default class Metadata {
	constructor(dto: MetadataDto) {
		this.sortKey = dto.sort_key;
		this.sortOrder = dto.sort_order;
		this.perPage = dto.per_page;
		this.offset = dto.offset;
		this.next = dto.next;
	}

	sortKey: string;
	sortOrder: string;
	perPage: number;
	offset: number;
	next: string;
}