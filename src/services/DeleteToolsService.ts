import { getCustomRepository } from 'typeorm';

import ToolsRepository from '../repositories/ToolsRepository';
import AppError from '../errors/AppError';

class DeleteToolsService {
  public async execute(id: string): Promise<void> {
    const toolsRepository = getCustomRepository(ToolsRepository);

    const tools = await toolsRepository.findOne(id);

    if (!tools) {
      throw new AppError('Tool does not exists', 401);
    }

    await toolsRepository.remove(tools);
  }
}
export default DeleteToolsService;
