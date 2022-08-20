import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatchService, IMatche } from '../interface/IMatches';

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
}

export default MatchesService;
