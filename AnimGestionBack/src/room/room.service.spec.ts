import { PrismaService } from '../../prisma/prisma.service';
import { RoomService } from './room.service';
import { Test } from '@nestjs/testing';

const prismaMock = {
  room: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('Room service', () => {
  let roomService: RoomService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    roomService = module.get(RoomService);

    prismaMock.room.findUnique.mockClear();
    prismaMock.room.findMany.mockClear();
  });

  describe('When the findOne method is called', () => {
    it('Should return the room', async () => {
      const mockRoom = {
        id: 'test-id',
        name: 'test-name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.room.findUnique.mockResolvedValue(mockRoom);

      const result = await roomService.findOne('test-id');
      expect(result).toBe(mockRoom);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });

    it('Should return null', async () => {
      prismaMock.room.findUnique.mockResolvedValue(null);
      const result = await roomService.findOne('id-not-found');
      expect(result).toBeNull();
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith({
        where: { id: 'id-not-found' },
      });
    });

    it('set null instead string', async () => {
      prismaMock.room.findUnique.mockResolvedValue(null);
      const result = await roomService.findOne(null);
      expect(result).toBeNull();
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(0);
    });
  });
  describe('When the findMany method is called', () => {
    it('Should return the rooms', async () => {
      const mockRoom = [
        {
          id: 'test-id1',
          name: 'test-name1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-id2',
          name: 'test-name2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-id3',
          name: 'test-name3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      prismaMock.room.findMany.mockResolvedValue(mockRoom);
      const result = await roomService.findAll();
      expect(result).toBe(mockRoom);
      expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
    });
  });
  it('Should return []', async () => {
    prismaMock.room.findMany.mockResolvedValue(null);
    const result = await roomService.findAll();
    expect(result).toBeNull();
    expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
  });
  describe('When the create method is called', () => {
    it('Should return the room', async () => {
      const mockRoom = {
        id: 'test-id',
        name: 'test-name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.room.create.mockResolvedValue(mockRoom);
      const result = await roomService.create(mockRoom);
      expect(result).toBe(mockRoom);
      expect(prismaMock.room.create).toHaveBeenCalledTimes(1);
    });
  });
  describe('When the update method is called', () => {
    it('Should return the update room', async () => {
      const mockRoom = {
        id: 'test-id',
        name: 'test-name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.room.update.mockResolvedValue(mockRoom);
      const id = 'test-id';
      const result = await roomService.update(id, mockRoom);
      expect(result).toBe(mockRoom);
      expect(prismaMock.room.update).toHaveBeenCalledTimes(1);
    });
  });
  describe('When the delete method is called', () => {
    it('Should return the delete room', async () => {
      const mockRoom = {
        id: 'test-id',
        name: 'test-name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.room.delete.mockResolvedValue(mockRoom);
      const id = 'test-id';
      const result = await roomService.remove(id);
      expect(result).toBe(mockRoom);
      expect(prismaMock.room.delete).toHaveBeenCalledTimes(1);
    });
  });
});
