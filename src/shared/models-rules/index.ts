import { AppRequest } from '../models';

const USER_MOCK = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request?: AppRequest): string {
  return (request?.user && request.user.id) || USER_MOCK;
}
