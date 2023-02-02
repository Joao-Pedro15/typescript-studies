import { Db, MongoClient } from 'mongodb'

class UserModel {
  _id: string
  name?: string
}

class UserRepository {
  
  constructor(
    private readonly db: Db,
    private readonly collectionName: string
  ){}
  
  async loadById(id: any): Promise<any> {
    const collection = this.db.collection(this.collectionName)
    const user = await collection.findOne({ _id: id })
    return user
  }

  async loadAll(): Promise<any[]> {
    const collection = this.db.collection(this.collectionName)
    const user = await collection.find().toArray()
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