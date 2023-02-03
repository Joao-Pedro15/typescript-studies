import { Collection, Db } from "mongodb"

export class BaseRepository<T> {
  readonly collection: Collection
  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName)
  }

  async loadById(id: string): Promise<T> {
    const entity = await this.collection.findOne({_id: id })
    return entity
  }

  async loadAll(): Promise<T[]> {
    const list = await this.collection.find().toArray()
    return list
  }
}