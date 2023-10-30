const NotesController = require('../../src/controllers/NotesController');
const knex = require('../../src/database/knex');

jest.mock('../../src/database/knex');

describe('NotesController', () => {
  let notesController;

  beforeEach(() => {
    notesController = new NotesController();
  });

  describe('create', () => {
    it('should create a new note with links and tags', async () => {
      const request = {
        body: {
          title: 'Note Title',
          description: 'Note Description',
          tags: ['Tag1', 'Tag2'],
          links: ['Link1', 'Link2'],
        },
        user: { id: 1 },
      };
      const response = {
        json: jest.fn(),
      };

      const note_id = 1;

      knex.mockReturnValue({
        insert: jest.fn().mockReturnValue([note_id]),
      });

      await notesController.create(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex().insert).toHaveBeenCalledWith({
        title: 'Note Title',
        description: 'Note Description',
        user_id: 1,
      });
      expect(knex).toHaveBeenCalledWith('links');
      expect(knex().insert).toHaveBeenCalledWith([
        { note_id, url: 'Link1' },
        { note_id, url: 'Link2' },
      ]);
      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex().insert).toHaveBeenCalledWith([
        { note_id, name: 'Tag1', user_id: 1 },
        { note_id, name: 'Tag2', user_id: 1 },
      ]);
      expect(response.json).toHaveBeenCalledWith();
    });
  });

  describe('show', () => {
    it('should return a note with tags and links', async () => {
      const request = {
        params: { id: 1 },
      };
      const response = {
        json: jest.fn(),
      };

      const note = {
        id: 1,
        title: 'Note Title',
        user_id: 1,
      };

      const tags = [
        { note_id: 1, name: 'Tag1', user_id: 1 },
        { note_id: 1, name: 'Tag2', user_id: 1 },
      ];

      const links = [
        { note_id: 1, url: 'Link1' },
        { note_id: 1, url: 'Link2' },
      ];

      knex.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(note),
      });

      knex().orderBy = jest.fn().mockReturnThis();
      knex().whereIn = jest.fn().mockReturnThis();
      knex().select = jest.fn().mockReturnThis();

      knex().where.mockReturnValue(knex());
      knex().orderBy.mockReturnValue(knex());
      knex().whereIn.mockReturnValue(knex());
      knex().select.mockReturnValue(tags);

      knex().where.mockReturnValue(knex());
      knex().orderBy.mockReturnValue(knex());
      knex().select.mockReturnValue(links);

      await notesController.show(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex().where).toHaveBeenCalledWith({ id: 1 });
      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex().where).toHaveBeenCalledWith({ note_id: 1 });
      expect(knex().orderBy).toHaveBeenCalledWith('name');
      expect(knex).toHaveBeenCalledWith('links');
      expect(knex().where).toHaveBeenCalledWith({ note_id: 1 });
      expect(knex().orderBy).toHaveBeenCalledWith('created_at');
      expect(response.json).toHaveBeenCalledWith({ ...note, tags, links });
    });
  });

  describe('delete', () => {
    it('should delete a note', async () => {
      const request = {
        params: { id: 1 },
      };
      const response = {
        json: jest.fn(),
      };

      knex.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        delete: jest.fn().mockResolvedValue(1), // Assume que 1 registro foi deletado
      });

      await notesController.delete(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex().where).toHaveBeenCalledWith({ id: 1 });
      expect(knex().delete).toHaveBeenCalledWith();
      expect(response.json).toHaveBeenCalledWith();
    });
  });

  describe('index', () => {
    it('should return a list of notes', async () => {
      const request = {
        query: {
          title: 'Note Title',
          tags: 'Tag1,Tag2',
        },
        user: { id: 1 },
      };
      const response = {
        json: jest.fn(),
      };

      const notes = [
        { id: 1, title: 'Note 1', user_id: 1 },
        { id: 2, title: 'Note 2', user_id: 1 },
      ];

      const tags = [
        { note_id: 1, name: 'Tag1', user_id: 1 },
        { note_id: 2, name: 'Tag2', user_id: 1 },
      ];

      knex.mockReturnValue({
        select: jest.fn().mockResolvedValue(notes),
        where: jest.fn().mockReturnThis(),
        whereLike: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
      });

    // ...
knex().whereIn = jest.fn().mockReturnThis();

knex().where.mockReturnValue(knex());
knex().whereLike.mockReturnValue(knex());
knex().innerJoin.mockReturnValue(knex());
knex().groupBy.mockReturnValue(knex());
knex().orderBy.mockReturnValue(knex());

knex().select.mockReturnValue(tags);

await notesController.index(request, response);
// ...

      
      knex
knex().orderBy.mockReturnValue(knex());
      knex().whereIn.mockReturnValue(knex());

      knex().select.mockReturnValue(tags);

      await notesController.index(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex().select).toHaveBeenCalledWith([
        'notes.id',
        'notes.title',
        'notes.user_id',
      ]);
      expect(knex().where).toHaveBeenCalledWith({ user_id: 1 });
      expect(knex().whereLike).toHaveBeenCalledWith('title', '%Note Title%');
      expect(knex().whereIn).toHaveBeenCalledWith('tags.name', ['Tag1', 'Tag2']);
      expect(knex().innerJoin).toHaveBeenCalledWith('notes', 'notes.id', 'tags.note_id');
      expect(knex().groupBy).toHaveBeenCalledWith('notes.id');
      expect(knex().orderBy).toHaveBeenCalledWith('notes.title');
      expect(response.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
});

