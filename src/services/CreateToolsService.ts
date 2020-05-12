import { getCustomRepository } from 'typeorm';

import Tools from '../models/Tools';
import ToolsRepository from '../repositories/ToolsRepository';

import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolsService {
  public async execute({
    title,
    link,
    description,
    tags,
  }: RequestDTO): Promise<Tools> {
    const toolsRepository = getCustomRepository(ToolsRepository);

    const toolExists = await toolsRepository.findOne({ where: { title } });

    if (toolExists) {
      throw new AppError('Tool already exist!', 401);
    }

    const tool = toolsRepository.create({
      title,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    return tool;
  }
}

export default CreateToolsService;
