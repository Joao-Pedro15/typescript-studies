import { Db, MongoClient, Collection } from 'mongodb'

class UserModel {
  _id: string
  name?: string
}

class MessageModel {
  userId: string
  message: string
}

class BaseRepository<T> {
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

class UserRepository extends BaseRepository<UserModel> {}

class MessageRepository extends BaseRepository<MessageModel> {
  async getByUser(id: string) {
    const user = await this.collection.findOne({ _id: id })
    return user
  }
}

class LoginController {
  async login() {
    const client = await MongoClient.connect('mongodb://localhost:27017/db')
    const repo = new UserRepository(client.db(), 'users')
    const user = await repo.loadById('5')
    user
  }
}