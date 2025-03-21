import User from '#models/user'

export default class UserRepository {
  public async create(data: Partial<User>): Promise<User> {
    return await User.create(data)
  }

  public async update(userId: string, data: Partial<User>): Promise<User> {
    const user = await User.findOrFail(userId)
    user.merge(data)
    await user.save()
    return user
  }

  public async archive(userId: string): Promise<void> {
    const user = await User.findOrFail(userId)
    user.isArchived = true
    await user.save()
  }

  public async findById(userId: string): Promise<User | null> {
    return await User.find(userId)
  }

  public async list(filters: Record<string, any>): Promise<User[]> {
    const query = User.query()
    if (filters.role) query.where('role', filters.role)
    if (filters.isArchived !== undefined) query.where('isArchived', filters.isArchived)
    return await query.orderBy('createdAt', 'desc')
  }
}
