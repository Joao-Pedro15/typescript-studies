import { Db, MongoClient, Collection } from 'mongodb'
import { UserRepository } from './repositories/UserRepository'


class LoginController {
  async login() {
    const client = await MongoClient.connect('mongodb://localhost:27017/db')
    const repo = new UserRepository(client.db(), 'users')
    const user = await repo.loadById('5')
    user
  }
}