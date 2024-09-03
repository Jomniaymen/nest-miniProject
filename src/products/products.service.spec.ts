import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Product } from './product.schema';
import { ProductDto } from './dto/product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product & Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            
            
            populate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product & Document>>(getModelToken(Product.name));
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const dto: ProductDto = {
        namepro: 'Product Name',
        description: 'Product Description',
        price: 100,
    orders:[]
      };

      const mockProduct = { ...dto, _id: 'someId' };
      model.create = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.createProduct(dto);
      expect(result).toEqual(mockProduct);
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id with populated orders', async () => {
      const id = 'someProductId';
      const mockProduct = {
        _id: id,
        namepro: 'Product Name',
        description: 'Product Description',
        price: 100,
        orders: [],
      };

      model.findById = jest.fn().mockReturnThis();
      model.populate = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.getProductById(id);
      expect(result).toEqual(mockProduct);
      expect(model.findById).toHaveBeenCalledWith(id);
      expect(model.populate).toHaveBeenCalledWith('orders');
    });

  
  });

  describe('getallpro', () => {
    it('should return an array of products with populated orders', async () => {
      const mockProducts = [
        {
          namepro: 'Product 1',
          description: 'Description 1',
          price: 100,
          orders: [],
        },
        {
          namepro: 'Product 2',
          description: 'Description 2',
          price: 200,
          orders: [],
        },
      ];

      model.find = jest.fn().mockReturnThis();
      model.populate = jest.fn().mockResolvedValue(mockProducts);

      const result = await service.getallpro();
      expect(result).toEqual(mockProducts);
      expect(model.find).toHaveBeenCalled();
      expect(model.populate).toHaveBeenCalledWith('orders');
    });
  });

  describe('updateProduct', () => {
    it('should update a product by id', async () => {
      const id = 'someProductId';
      const dto: ProductDto = {
        namepro: 'Updated Product Name',
        description: 'Updated Description',
        price: 150,
        orders:[]
      };

      const updatedProduct = { ...dto, _id: id };
      model.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProduct);

      const result = await service.updateProduct(id, dto);
      expect(result).toEqual(updatedProduct);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, dto, { new: true });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by id', async () => {
      const id = 'someProductId';
      model.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: id });

      const result = await service.deleteProduct(id);
      expect(result).toEqual({ _id: id });
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
