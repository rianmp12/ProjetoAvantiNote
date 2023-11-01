const sqliteConnection = require('../../src/database/sqlite');
const DiskStorage = require('../../src/providers/DiskStorage');
const UserAvatarController = require('../../src/controllers/UserAvatarController');

jest.mock('../../src/database/sqlite');
jest.mock('../../src/providers/DiskStorage');

describe('UserAvatarController', () => {
  it('deve atualizar o avatar do usuário', async () => {
    // Mock request and response objects
    const request = {
      user: { id: 1 },
      file: { filename: 'avatar.jpg' },
    };
    const response = {
      json: jest.fn(),
    };

    // Mock database and diskStorage
    const database = {
      get: jest.fn().mockResolvedValue({ id: 1, avatar: 'old_avatar.jpg' }),
      run: jest.fn(),
    };
    sqliteConnection.mockResolvedValue(database);

    const diskStorage = {
      deleteFile: jest.fn(),
      saveFile: jest.fn().mockResolvedValue('new_avatar.jpg'),
    };
    DiskStorage.mockReturnValue(diskStorage);

    // Create and execute the controller
    const userAvatarController = new UserAvatarController();
    await userAvatarController.update(request, response);

    // Assertions
    expect(database.get).toHaveBeenCalledWith('SELECT * FROM users WHERE id = (?)', [1]);
    expect(diskStorage.deleteFile).toHaveBeenCalledWith('old_avatar.jpg');
    expect(diskStorage.saveFile).toHaveBeenCalledWith('avatar.jpg');
    expect(database.run).toHaveBeenCalledWith(
      `UPDATE users SET 
      avatar = ?,
      updated_at = ?
      WHERE id = ?`,
      ['new_avatar.jpg', expect.any(Date), 1]
    );
    expect(response.json).toHaveBeenCalledWith({ id: 1, avatar: 'new_avatar.jpg' });
  });
});