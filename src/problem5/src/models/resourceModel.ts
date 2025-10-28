import { Database } from "sqlite";

export interface Resource {
  id?: number;
  name: string;
  description?: string;
  createdAt?: string;
}

export const ResourceModel = {
  async create(db: Database, resource: Resource) {
    const { name, description } = resource;
    const result = await db.run(
      "INSERT INTO resources (name, description) VALUES (?, ?)",
      [name, description]
    );
    return { id: result.lastID, ...resource };
  },

  async findAll(db: Database, filter?: string) {
    const query = filter
      ? `SELECT * FROM resources WHERE name LIKE ? ORDER BY createdAt DESC`
      : `SELECT * FROM resources ORDER BY createdAt DESC`;
    const params = filter ? [`%${filter}%`] : [];
    return db.all(query, params);
  },

  async findById(db: Database, id: number) {
    return db.get("SELECT * FROM resources WHERE id = ?", [id]);
  },

  async update(db: Database, id: number, data: Resource) {
    const { name, description } = data;
    await db.run(
      "UPDATE resources SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    return this.findById(db, id);
  },

  async remove(db: Database, id: number) {
    await db.run("DELETE FROM resources WHERE id = ?", [id]);
  },
};
