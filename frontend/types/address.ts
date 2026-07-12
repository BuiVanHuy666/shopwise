export interface Address {
	id: number | string;
	receiver_name: string;
	receiver_phone_number: string;
	address_detail: string;
	province: {
		code: string,
		label: string
	}
	ward: {
			code: string,
			label: string
	}
	is_default: boolean;
}