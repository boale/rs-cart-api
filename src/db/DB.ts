import { Pool, QueryResult } from 'pg';
import { NamedParams } from './types';

export class DB {
  constructor(private pool: Pool) {
  }

  executeQuery(queryText: string, values: unknown[] = []): Promise<any[]> | undefined {
    return this.pool?.query(queryText, values).then((res: QueryResult) => res?.rows);
  }

  parseNamedParams(sql: string, params?: Record<string, unknown>): NamedParams {
    const result: NamedParams = {
      sql,
      params: [],
    };

    if (!params) {
      return result;
    }
    let n = 1;
    Object.entries(params).forEach(([key, value]) => {
      const splitted = result.sql.split(`:${key}`);
      if (splitted.length > 1) {
        result.params.push(value);
        result.sql = splitted.join(`$${n}`);
        n += 1;
      }
    })
    return result;
  }

  query<T>(sql: string, params: Record<string, unknown>): Promise<T[] | undefined> {
    const sqlWithParams = this.parseNamedParams(sql, params);
    return new Promise((resolve, reject) => {
      this.executeQuery(sqlWithParams.sql, sqlWithParams.params).then(result => resolve(result)).catch(error => reject(error))
    })
  }
}
