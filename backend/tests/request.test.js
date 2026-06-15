jest.mock('../src/models', () => ({
  request: {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findHistoryByUser: jest.fn(),
    findConversationsByUser: jest.fn(),
    findByHelper: jest.fn(),
    refuseOtherRequestsByAd: jest.fn(),
  },
  ad: {
    updateStatus: jest.fn(),
  },
}));

const requestControllers = require('../src/controllers/requestControllers');
const models = require('../src/models');

describe('Request Controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addRequest', () => {
    test('doit créer une nouvelle requête avec les données fournies', async () => {
      const req = {
        body: {
          id_ad: 1,
          id_user: 5,
          id_helper: 10,
        },
      };

      const res = {
        location: jest.fn().mockReturnThis(),
        sendStatus: jest.fn(),
      };

      models.request.create.mockResolvedValue([{ insertId: 1 }]);

      await requestControllers.addRequest(req, res);

      expect(models.request.create).toHaveBeenCalledWith(req.body);
      expect(res.location).toHaveBeenCalledWith('/requests/1');
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe('browseConversationsByUser', () => {
    test('doit récupérer les conversations d\'un utilisateur', async () => {
      const conversationData = [
        {
          id: 1,
          id_ad: 5,
          id_user: 2,
          id_helper: 3,
          status: 'en cours',
        },
      ];

      const req = {
        params: { id: 2 },
      };

      const res = {
        json: jest.fn(),
      };

      models.request.findConversationsByUser.mockResolvedValue([
        conversationData,
      ]);

      await requestControllers.browseConversationsByUser(req, res);

      expect(models.request.findConversationsByUser).toHaveBeenCalledWith(2);
      expect(res.json).toHaveBeenCalledWith(conversationData);
    });
  });

  describe('updateRequest', () => {
    test('doit refuser les statuts invalides', async () => {
      const req = {
        params: { id: 1 },
        body: { status: 'invalid_status' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await requestControllers.updateRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Statut de requête invalide.',
        })
      );
    });

    test('doit retourner 404 si la requête n\'existe pas', async () => {
      const req = {
        params: { id: 999 },
        body: { status: 'accepter' },
      };

      const res = {
        sendStatus: jest.fn(),
      };

      models.request.findById.mockResolvedValue([[]]);

      await requestControllers.updateRequest(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('doit mettre à jour le statut d\'une requête avec accepter', async () => {
      const req = {
        params: { id: 1 },
        body: { status: 'accepter' },
      };

      const res = {
        sendStatus: jest.fn(),
      };

      const existingRequest = {
        id: 1,
        id_ad: 5,
        status: 'en attente',
      };

      models.request.findById.mockResolvedValue([[existingRequest]]);
      models.request.update.mockResolvedValue([{ affectedRows: 1 }]);
      models.ad.updateStatus.mockResolvedValue([{ affectedRows: 1 }]);
      models.request.refuseOtherRequestsByAd.mockResolvedValue([
        { affectedRows: 0 },
      ]);

      await requestControllers.updateRequest(req, res);

      expect(models.request.findById).toHaveBeenCalledWith(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
