import CryptoJS from 'crypto-js';



const base64UrlEncode = (str: string): string => {
	return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const generateSignedUrl = (
	videoPath: string,
	expiration: number,
	remoteIp?: string,
	queryParams?: { [key: string]: string }
): string => {
	const baseUrl = `https://vz-b8553144-3b2.b-cdn.net/${videoPath}`;
	const queryParamsString = queryParams
		? Object.keys(queryParams).sort().map(key => `${key}=${queryParams[key]}`).join('&')
		: '';

	const signedUrl = `${baseUrl}?expires=${expiration}${queryParamsString ? `&${queryParamsString}` : ''}`;
	const stringToHash = `${process.env.BUNNY_API_KEY}${signedUrl}${expiration}${remoteIp || ''}${queryParamsString}`;

	const hash = CryptoJS.SHA256(stringToHash);
	const base64Hash = CryptoJS.enc.Base64.stringify(hash);
	const token = base64UrlEncode(base64Hash);

	return `${signedUrl}&token=${token}`;
};
