import { ITeams, ITeamsService } from '../interface/ITeams';
import TeamsModel from '../database/models/Teams';
import ErrorHandler from '../utils/ErrorHandler';

class TeamsService implements ITeamsService {
  getAll = async (): Promise<ITeams[]> => {
    const teams = await TeamsModel.findAll({ raw: true });
    return teams;
  };

  getByPK = async (id: number): Promise<void> => {
    const exist = await TeamsModel.findByPk(id);
    if (!exist) ErrorHandler.notFound();
  };

  getById = async (id: number): Promise<ITeams | Record<string, string>> => {
    const team = await TeamsModel.findOne(
      {
        raw: true,
        where: { id },
      },
    );

    if (!team) {
      return {};
    }
    return team as ITeams;
  };
}

export default TeamsService;
