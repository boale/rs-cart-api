import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { Client } from 'pg';

import { Cart } from '../models';

const CARTS_TABLE_NAME = 'carts'
const CART_ITEMS_TABLE_NAME = 'cart_items'

@Injectable()
export class CartService implements OnModuleInit, OnApplicationShutdown{
  private client: Client

  async onModuleInit() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionTimeoutMillis: 10_000, 
    })

    try {
      await this.client.connect()
    } catch (e) {
      console.log('error', e)
    }
  }

  async onApplicationShutdown() {
    await this.client.end()
  }

  async findByUserId(userId: string): Promise<Cart> {
    const res = await this.client.query(`SELECT * FROM ${CARTS_TABLE_NAME} WHERE user_id = $1`, [userId])
    return res.rows[0];
  }

  async createByUserId(userId: string): Promise<Cart> {
    try {
      await this.client.query('BEGIN')
      const {rows} = await this.client.query(
        `INSERT INTO ${CARTS_TABLE_NAME} (user_id, create_at, updated_at, status) values ($1, NOW(), NOW(), 'OPEN')`,
        [userId]
      )

      const cartId = rows[0].id

      await this.client.query(
        `INSERT INTO ${CART_ITEMS_TABLE_NAME} (cart_id) values($1)`,
        [cartId]
      )

      await this.client.query('COMMIT')

      return rows[0]
    } catch (e) {
      console.log('error', e)
      await this.client.query('ROLLBACK')
      throw e
    }
  }

  async findOrCreateByUserId (userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId)

    if (!userCart) {
      return this.createByUserId(userId)
    }

    return userCart
  }

  async updateByUserId (userId: string, { items }: Cart): Promise<Cart> {
    await this.client.query('BEGIN')

    try {
      const cart = await this.client.query(
        `SELECT id FROM ${CARTS_TABLE_NAME} WHERE user_id = $1`,
        [userId]
        )
        
      const cartId = cart.rows[0].id

      await this.client.query(
        `UPDATE ${CARTS_TABLE_NAME} SET updated_at = NOW() WHERE id=$1`,
        [cartId]
      )

      for (const item of items) {
        await this.client.query(
          `INSERT INTO ${CART_ITEMS_TABLE_NAME} (cart_id, product_id, count) VALUES ($1, $2, $3)
           ON CONFLICT (product_id)
           DO UPDATE SET count = EXCLUDED.count
          `,
          [cartId, item.product.id, item.count]
        )
      }

      await this.client.query('COMMIT')
    } catch (e) {
      await this.client.query('ROLLBACK')
      throw e
    }


    return this.findByUserId(userId)
  }

  async removeByUserId (userId: string): Promise<void> {
    await this.client.query('BEGIN')

    try {
      const { rows } = await this.client.query(
        `SELECT id FROM ${CARTS_TABLE_NAME} WHERE user_id = $1`,
        [userId]
      )

      const ids = rows.map((item) => item.id)

      for ( const id of ids ) {
        await this.client.query(
          `DELETE FROM ${CART_ITEMS_TABLE_NAME} WHERE cart_id = $1`,
          [id]
        )
      }

      await this.client.query(
        `DELETE FROM ${CARTS_TABLE_NAME} WHERE user_id = $1`,
        [userId]
      )

      await this.client.query('COMMIT')
    } catch (e) {
      await this.client.query('ROLLBACK')
      throw e
    }
  }
}
