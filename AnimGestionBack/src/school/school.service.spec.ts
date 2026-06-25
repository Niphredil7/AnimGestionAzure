import { Test } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SchoolType } from '@prisma/client';

const prismaMock = {
  school: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('SchoolService', () => {
  let schoolService: SchoolService;

  const mockSchool = {
    id: 'test-id',
    name: 'test-name',
    address: 'test-address-unique',
    zipCode: 35000,
    city: 'Rennes',
    type: SchoolType.PRIMAIRE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SchoolService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    schoolService = module.get(SchoolService);

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a school', async () => {
      prismaMock.school.findUnique.mockResolvedValue(mockSchool);

      const result = await schoolService.findOne('test-id');

      expect(result).toBe(mockSchool);
      expect(prismaMock.school.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.school.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });

    it('should return null when school is not found', async () => {
      prismaMock.school.findUnique.mockResolvedValue(null);

      const result = await schoolService.findOne('id-not-found');

      expect(result).toBeNull();
      expect(prismaMock.school.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.school.findUnique).toHaveBeenCalledWith({
        where: { id: 'id-not-found' },
      });
    });

    it('should return null when id is empty', async () => {
      const result = await schoolService.findOne('');

      expect(result).toBeNull();
      expect(prismaMock.school.findUnique).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all schools', async () => {
      const mockSchools = [
        mockSchool,
        {
          ...mockSchool,
          id: 'test-id-2',
          name: 'test-name-2',
          address: 'test-address-unique-2',
        },
      ];

      prismaMock.school.findMany.mockResolvedValue(mockSchools);

      const result = await schoolService.findAll();

      expect(result).toBe(mockSchools);
      expect(prismaMock.school.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array', async () => {
      prismaMock.school.findMany.mockResolvedValue([]);

      const result = await schoolService.findAll();

      expect(result).toEqual([]);
      expect(prismaMock.school.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a school', async () => {
      prismaMock.school.create.mockResolvedValue(mockSchool);

      const createDto = {
        name: 'test-name',
        address: 'test-address-unique',
        zipCode: 35000,
        city: 'Rennes',
        type: SchoolType.PRIMAIRE,
      };

      const result = await schoolService.create(createDto);

      expect(result).toBe(mockSchool);
      expect(prismaMock.school.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.school.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe('update', () => {
    it('should update a school', async () => {
      prismaMock.school.update.mockResolvedValue(mockSchool);

      const updateDto = {
        name: 'updated-name',
      };

      const result = await schoolService.update('test-id', updateDto);

      expect(result).toBe(mockSchool);
      expect(prismaMock.school.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.school.update).toHaveBeenCalledWith({
        where: { id: 'test-id' },
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a school', async () => {
      prismaMock.school.delete.mockResolvedValue(mockSchool);

      const result = await schoolService.remove('test-id');

      expect(result).toBe(mockSchool);
      expect(prismaMock.school.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.school.delete).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });
  });
});
