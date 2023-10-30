const sqliteConnection = require('../../src/database/sqlite');
const DiskStorage = require("../../src/providers/DiskStorage");
const UserAvatarController = require("../../src/controllers/UserAvatarController");
const AppError = require('../../src/utils/AppError');

jest.mock('../../src/database/sqlite');
jest.mock("../../src/providers/DiskStorage");

describe("UserAvatarController", () => {
  let userAvatarController;

  beforeEach(() => {
    userAvatarController = new UserAvatarController();
  });

  describe("update", () => {
    it("should update the user's avatar", async () => {
      const request = {
        user: { id: 1 },
        file: { filename: "avatar.jpg" },
      };
      const response = {
        json: jest.fn(),
      };

      const database = {
        get: jest.fn().mockResolvedValue({ id: 1, avatar: "old_avatar.jpg" }),
        run: jest.fn(),
      };
      sqliteConnection.mockResolvedValue(database);

      const diskStorage = {
        deleteFile: jest.fn(),
        saveFile: jest.fn().mockResolvedValue("new_avatar.jpg"),
      };
      DiskStorage.mockImplementation(() => diskStorage);

      await userAvatarController.update(request, response);

      expect(database.get).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = (?)",
        [1]
      );
      expect(diskStorage.deleteFile).toHaveBeenCalledWith("old_avatar.jpg");
      expect(diskStorage.saveFile).toHaveBeenCalledWith("avatar.jpg");
      expect(database.run).toHaveBeenCalledWith(
        `UPDATE users SET 
        avatar = ?,
        updated_at = ?
        WHERE id = ?`,
        ["new_avatar.jpg", expect.any(Date), 1]
      );
      expect(response.json).toHaveBeenCalledWith({ id: 1, avatar: "new_avatar.jpg" });
    });

    it("should throw an error if the user is not authenticated", async () => {
      const request = {
        user: undefined,
      };
      const response = {
        json: jest.fn(),
      };

      try {
        await userAvatarController.update(request, response);
      } catch (error) {
        expect(error instanceof AppError).toBe(true);
        expect(error.message).toBe("Somente usuários autenticados podem mudar o avatar");
        expect(error.statusCode).toBe(401);
        expect(response.json).not.toHaveBeenCalled();
      }
    });
  });
});
