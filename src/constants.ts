import { HttpHeaders } from 'aws-sdk/clients/iot';


export const JWT_CONFIG = {
  secret: 'secret',
  expiresIn: '12h'
}

export const headers: HttpHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': '*',
	'Access-Control-Allow-Headers': '*'
};
