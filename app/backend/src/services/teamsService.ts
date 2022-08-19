import { ITeams, ITeamsService } from '../interface/ITeams';
import TeamsModel from '../database/models/Teams';

class TeamsService implements ITeamsService {
  getAll = async (): Promise<ITeams[]> => {
    const teams = await TeamsModel.findAll({ raw: true });
    return teams;
  };
}

export default TeamsService;
