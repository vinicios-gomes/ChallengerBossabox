import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ToolsRepository from '../repositories/ToolsRepository';
import CreateToolsService from '../services/CreateToolsService';
import DeleteToolsService from '../services/DeleteToolsService';

const toolsRouter = Router();

toolsRouter.get('/', async (request, response) => {
  const toolsRepository = getCustomRepository(ToolsRepository);

  const tools = await toolsRepository.find();

  return response.json(tools);
});

toolsRouter.post('/', async (request, response) => {
  const { title, link, description, tags } = request.body;

  const createTool = new CreateToolsService();

  const tool = await createTool.execute({
    title,
    link,
    description,
    tags,
  });

  delete tool.created_at;
  delete tool.updated_at;

  return response.status(201).json(tool);
});

toolsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTool = new DeleteToolsService();

  await deleteTool.execute(id);

  return response.status(204).json();
});

export default toolsRouter;
