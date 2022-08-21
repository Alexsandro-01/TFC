import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatchService, IMatche, ICreateMatche } from '../interface/IMatches';

class MatchesService implements IMatchService {
  getAll = async (): Promise<IMatche[]> => {
    const response = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return response as Matches[];
  };

  addNewMatch = async (newMatchData: ICreateMatche): Promise<IMatche> => {
    const response = await Matches.create(newMatchData);
    return response;
  };
}

export default MatchesService;
