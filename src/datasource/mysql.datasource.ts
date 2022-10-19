import mysql, {Pool, PoolConnection} from "mysql";

declare type AnyObject = {[a: string]: any};

export class MySQL {
  private static instance: MySQL;
  private pool: Pool;
  private connection?: PoolConnection;

  constructor() {
    const options = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT ?? 3306) ,
    };

    this.pool = mysql.createPool(options);
  }

  public static getInstance(): MySQL {
    if (!MySQL.instance) MySQL.instance = new MySQL();

    return MySQL.instance;
  }

  private getConnection() {
    return new Promise<PoolConnection>((resolve, reject) => {
      this.pool.getConnection((err, client) => {
        if(err) reject(err);
        else resolve(client);
      });
    });
  }

  private asyncQuery(client: PoolConnection, sql: string, param?: unknown[]) {
    return new Promise<AnyObject[]>((resolve, reject) => {
      client.query(sql, param, (err, results) => {
        if(err) reject(err);
        else resolve(results);
      });
    });
  }

  public async connect() {
    if(!this.connection)
      this.connection = await this.getConnection();
  }

  public release() {
    this.connection?.destroy();
    this.connection = undefined;
  }

  public async query(sql: string, values?: unknown[]) {
    await this.connect();
    let result: AnyObject[] = [];

    if(this.connection)
      result = await this.asyncQuery(this.connection, sql, values);

    return result;
  }
}
