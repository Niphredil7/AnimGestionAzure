import { Test } from '@nestjs/testing';
import { PlanningService } from './planning.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ClasseService } from 'src/classe/classe.service';

const prismaMock = {
  planning: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('Planning service', () => {
  let planningService: PlanningService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlanningService,
        ClasseService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    planningService = module.get(PlanningService);

    prismaMock.planning.findUnique.mockClear();
    prismaMock.planning.findMany.mockClear();
  });

  describe('When the findOne method is called', () => {
    it('Should return the planning', async () => {
      const mockPlanning = {
        id: 'test-id',
        dateStart: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.planning.findUnique.mockResolvedValue(mockPlanning);

      const result = await planningService.findOne('test-id');
      expect(result).toBe(mockPlanning);
      expect(prismaMock.planning.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.planning.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });

    it('Should return null', async () => {
      prismaMock.planning.findUnique.mockResolvedValue(null);
      const result = await planningService.findOne('id-not-found');
      expect(result).toBeNull();
      expect(prismaMock.planning.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.planning.findUnique).toHaveBeenCalledWith({
        where: { id: 'id-not-found' },
      });
    });

    it('set null instead string', async () => {
      prismaMock.planning.findUnique.mockResolvedValue(null);
      const result = await planningService.findOne(null);
      expect(result).toBeNull();
      expect(prismaMock.planning.findUnique).toHaveBeenCalledTimes(0);
    });
  });
  describe('When the findMany method is called', () => {
    it('Should return the plannings', async () => {
      const mockPlanning = [
        {
          id: 'test-id1',
          dateStart: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-id2',
          dateStart: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-id3',
          dateStart: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      prismaMock.planning.findMany.mockResolvedValue(mockPlanning);
      const result = await planningService.findAll();
      expect(result).toBe(mockPlanning);
      expect(prismaMock.planning.findMany).toHaveBeenCalledTimes(1);
    });
  });
  it('Should return []', async () => {
    prismaMock.planning.findMany.mockResolvedValue(null);
    const result = await planningService.findAll();
    expect(result).toBeNull();
    expect(prismaMock.planning.findMany).toHaveBeenCalledTimes(1);
  });
  describe('When the create method is called', () => {
    it('Should return the planning', async () => {
      const mockPlanning = {
        id: 'test-id',
        dateStart: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.planning.create.mockResolvedValue(mockPlanning);
      const result = await planningService.create(mockPlanning);
      expect(result).toBe(mockPlanning);
      expect(prismaMock.planning.create).toHaveBeenCalledTimes(1);
    });
  });
  describe('When the update method is called', () => {
    it('Should return the update planning', async () => {
      const mockPlanning = {
        id: 'test-id',
        dateStart: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.planning.update.mockResolvedValue(mockPlanning);
      const id = 'test-id';
      const result = await planningService.update(id, mockPlanning);
      expect(result).toBe(mockPlanning);
      expect(prismaMock.planning.update).toHaveBeenCalledTimes(1);
    });
  });
  describe('When the delete method is called', () => {
    it('Should return the delete planning', async () => {
      const mockPlanning = {
        id: 'test-id',
        dateStart: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.planning.delete.mockResolvedValue(mockPlanning);
      const id = 'test-id';
      const result = await planningService.remove(id);
      expect(result).toBe(mockPlanning);
      expect(prismaMock.planning.delete).toHaveBeenCalledTimes(1);
    });
  });
});
